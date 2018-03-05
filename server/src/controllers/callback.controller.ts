import { Request, Response } from "express";
import * as qs from "qs";
import * as querystring from "querystring";
// import * as request from "sync-request";
const request = require("sync-request");
import * as jose from "jsrsasign";
import * as base64url from "base64-url";
import * as __ from "underscore";

import { stateService } from "../services";
import { setCookies } from "../helpers";

// import * as randomstring from "randomstring";
// import { buildUrl } from "../../helpers";
// // import clientService from "../client/client.service";

const client = {
    client_id: "oauth-client-1",
    client_secret: "oauth-client-secret-1",
    redirect_uris: ["http://localhost:1412/callback"],
    scope: "openid profile email phone address",
};

const root = "http://cantinas.dev.identity.appstudio.ro:1420"; // on localhost

const authServer = {
    authorizationEndpoint: root + "/authorize",
    tokenEndpoint: root + "/token",
    revocationEndpoint: "http://localhost:1420/revoke",
    registrationEndpoint: "http://localhost:1420/register",
    userInfoEndpoint: root + "/userinfo",
};

const rsaKey = {
    alg: "RS256",
    e: "AQAB",
    n:
        "p8eP5gL1H_H9UNzCuQS-vNRVz3NWxZTHYk1tG9VpkfFjWNKG3MFTNZJ1l5g_COMm2_2i_YhQNH8MJ_nQ4exKMXrWJB4tyVZohovUxfw-eLgu1XQ8oYcVYW8ym6Um-BkqwwWL6CXZ70X81YyIMrnsGTyTV6M8gBPun8g2L8KbDbXR1lDfOOWiZ2ss1CRLrmNM-GRp3Gj-ECG7_3Nx9n_s5to2ZtwJ1GS1maGjrSZ9GRAYLrHhndrL_8ie_9DS2T-ML7QNQtNkg2RvLv4f0dpjRYI23djxVtAylYK4oiT_uEMgSkc4dxwKwGuBxSO0g9JOobgfy0--FUHHYtRi0dOFZw",
    kty: "RSA",
    kid: "authserver",
};

let access_token;
let refresh_token;
let scope;
let id_token;
let userInfo;

export const callbackController = {
    // GET
    callback: async (req: Request, res: Response) => {
        if (req.query.error) {
            // it's an error response, act accordingly
            res.render("error", { error: req.query.error });
            return;
        }

        const resState = req.query.state;

        const stateObj = await stateService.get(resState);
        const state = stateObj.state;

        if (state) {
            console.log("State value matches: expected %s got %s", state, resState);
            stateService.delete(state);
        } else {
            console.log("State DOES NOT MATCH: expected %s got %s", state, resState);
            res.render("error", { error: "State value did not match" });
            return;
        }

        const code = req.query.code;

        const form_data = qs.stringify({
            grant_type: "authorization_code",
            code,
            redirect_uri: client.redirect_uris[0],
        });
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + encodeClientCredentials(client.client_id, client.client_secret),
        };

        const tokRes = request("POST", authServer.tokenEndpoint, {
            body: form_data,
            headers,
        });

        console.log("Requesting access token for code %s", code);

        if (tokRes.statusCode >= 200 && tokRes.statusCode < 300) {
            const body = JSON.parse(tokRes.getBody());

            access_token = body.access_token;
            console.log("Got access token: %s", access_token);
            if (body.refresh_token) {
                refresh_token = body.refresh_token;
                console.log("Got refresh token: %s", refresh_token);
            }

            scope = body.scope;
            console.log("Got scope: %s", scope);

            if (body.id_token) {
                userInfo = undefined;
                id_token = undefined;

                console.log("Got ID token: %s", body.id_token);

                // Parse and validate the ID token
                const pubKey = jose.KEYUTIL.getKey(rsaKey);

                // const tokenParts = body.id_token.split(".");
                // const payload = JSON.parse(base64url.decode(tokenParts[1]));
                // console.log("Payload", payload);

                const signatureValid = jose.jws.JWS.verify(body.id_token, pubKey, [rsaKey.alg]);
                if (signatureValid) {
                    console.log("Signature validated.");
                    const tokenParts = body.id_token.split(".");
                    const payload = JSON.parse(base64url.decode(tokenParts[1]));
                    console.log("Payload", payload);
                    if (payload.iss === "http://localhost:1420/") {
                        console.log("issuer OK");
                        if (
                            (Array.isArray(payload.aud) && __.contains(payload.aud, client.client_id)) ||
                            payload.aud === client.client_id
                        ) {
                            console.log("Audience OK");

                            const now = Math.floor(Date.now() / 1000);

                            if (payload.iat <= now) {
                                console.log("issued-at OK");
                                if (payload.exp >= now) {
                                    console.log("expiration OK");

                                    console.log("Token valid!");

                                    // save just the payload, not the container (which has been validated)
                                    id_token = payload;
                                }
                            }
                        }
                    }
                }
                // res.render("userinfo", { userInfo, id_token });

                setCookies(res, JSON.stringify(id_token), access_token);
                res.redirect("/userinfo");
                return;
            } else {
                res.render("index", { access_token, refresh_token, scope, id_token, client });
            }
        } else {
            res.render("error", { error: "Unable to fetch access token, server response: " + tokRes.statusCode });
        }
    },
};

const encodeClientCredentials = (clientId, clientSecret) => {
    return new Buffer(querystring.escape(clientId) + ":" + querystring.escape(clientSecret)).toString("base64");
};
