import * as express from "express";
import * as path from "path";
import { EnvironmentType } from "./constants";

import config from "./config";

import allRoutes from "./routes";

import * as url from "url";
import * as bodyParser from "body-parser";
import * as randomstring from "randomstring";
import * as cons from "consolidate";
import * as querystring from "querystring";
import * as qs from "qs";
import * as __ from "underscore";
import * as __string from "underscore.string";
// import * as request from "sync-request";
const request = require("sync-request");

import * as base64url from "base64-url";
import * as jose from "jsrsasign";

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("html", cons.underscore);
app.set("view engine", "html");
app.set("views", "src/files");

// client information

const client = {
    client_id: "oauth-client-1",
    client_secret: "oauth-client-secret-1",
    redirect_uris: ["http://localhost:1412/callback"],
    scope: "openid profile email phone address",
};

// authorization server information
const authServer = {
    authorizationEndpoint: "http://localhost:1420/authorize",
    tokenEndpoint: "http://localhost:1420/token",
    revocationEndpoint: "http://localhost:1420/revoke",
    registrationEndpoint: "http://localhost:1420/register",
    userInfoEndpoint: "http://localhost:1420/userinfo",
};

const rsaKey = {
    alg: "RS256",
    e: "AQAB",
    n:
        "p8eP5gL1H_H9UNzCuQS-vNRVz3NWxZTHYk1tG9VpkfFjWNKG3MFTNZJ1l5g_COMm2_2i_YhQNH8MJ_nQ4exKMXrWJB4tyVZohovUxfw-eLgu1XQ8oYcVYW8ym6Um-BkqwwWL6CXZ70X81YyIMrnsGTyTV6M8gBPun8g2L8KbDbXR1lDfOOWiZ2ss1CRLrmNM-GRp3Gj-ECG7_3Nx9n_s5to2ZtwJ1GS1maGjrSZ9GRAYLrHhndrL_8ie_9DS2T-ML7QNQtNkg2RvLv4f0dpjRYI23djxVtAylYK4oiT_uEMgSkc4dxwKwGuBxSO0g9JOobgfy0--FUHHYtRi0dOFZw",
    kty: "RSA",
    kid: "authserver",
};

const protectedResource = "http://localhost:1416/resource";
const wordApi = "http://localhost:1416/words";
const produceApi = "http://localhost:1416/produce";
const favoritesApi = "http://localhost:1416/favorites";

let access_token;
let refresh_token;
let scope;
const id_token = 123456789; // get from cookie

app.get("/fetch_resource", (req, res) => {
    if (!access_token) {
        res.render("error", { error: "Missing access token." });
        return;
    }

    console.log("Making request with access token %s", access_token);

    const headers = {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/x-www-form-urlencoded",
    };

    const resource = request("POST", protectedResource, { headers });

    if (resource.statusCode >= 200 && resource.statusCode < 300) {
        const body = JSON.parse(resource.getBody());
        res.render("data", { resource: body });
        return;
    } else {
        access_token = undefined;
        if (refresh_token) {
            // try to refresh and start again
            refreshaccess_token(req, res);
            return;
        } else {
            res.render("error", { error: "Server returned response code: " + resource.statusCode });
            return;
        }
    }
});

app.post("/revoke", (req, res) => {
    const form_data = qs.stringify({
        token: access_token,
    });
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + encodeClientCredentials(client.client_id, client.client_secret),
    };
    console.log("Revoking token %s", access_token);
    const tokRes = request("POST", authServer.revocationEndpoint, {
        body: form_data,
        headers,
    });

    access_token = null;
    refresh_token = null;
    scope = null;

    if (tokRes.statusCode >= 200 && tokRes.statusCode < 300) {
        res.render("index", { access_token, refresh_token, scope, id_token, client });
        return;
    } else {
        res.render("error", { error: tokRes.statusCode });
        return;
    }
});

const refreshaccess_token = (req, res) => {
    const form_data = qs.stringify({
        grant_type: "refresh_token",
        refresh_token,
        client_id: client.client_id,
        client_secret: client.client_secret,
        redirect_uri: client.redirect_uris[0],
    });
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    };
    console.log("Refreshing token %s", refresh_token);
    const tokRes = request("POST", authServer.tokenEndpoint, {
        body: form_data,
        headers,
    });
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

        // try again
        res.redirect("/fetch_resource");
        return;
    } else {
        console.log("No refresh token, asking the user to get a new access token");
        // tell the user to get a new access token
        res.redirect("/authorize");
        return;
    }
};

app.use("/", express.static("src/files"));

const encodeClientCredentials = (clientId, clientSecret) => {
    return new Buffer(querystring.escape(clientId) + ":" + querystring.escape(clientSecret)).toString("base64");
};

app.use(allRoutes);

if (config.env === EnvironmentType.PRODUCTION || config.env === EnvironmentType.STAGING) {
    // in production mode run application from dist folder
    app.use("/app", express.static(path.join(__dirname, "../client")));
    app.get("/app/*", (req, res) => {
        const file = path.join(__dirname, "../client/index.html");
        res.sendFile(file);
    });
}

export default app;
