import { Request, Response } from "express";
import * as randomstring from "randomstring";
import { urlHelper } from "../helpers";
import { stateService } from "../services";
// import clientService from "../client/client.service";

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

let access_token;
let refresh_token;
let scope;
const id_token = "123";

export const homeController = {

    // GET
    getHomePage: async (req: Request, res: Response) => {
        // const clients = await clientService.getAll();

        // const testUrl = req.protocol + "://" + req.get("host");

        // res.render("../components/homepage/index", { clients, authServer, testUrl });
        res.render("index", { access_token, refresh_token, scope, id_token, client });
    },

    // GET
    authorize: async (req: Request, res: Response) => {
        // if (!client.client_id) {
        //     registerClient();
        //     if (!client.client_id) {
        //         res.render("error", { error: "Unable to register client." });
        //         return;
        //     }
        // }

        access_token = null;
        refresh_token = null;
        scope = null;
        const state = randomstring.generate();
        stateService.create({state});

        const authorizeUrl = urlHelper.buildUrl(authServer.authorizationEndpoint, {
            response_type: "code",
            scope: client.scope,
            client_id: client.client_id,
            redirect_uri: client.redirect_uris[0],
            state,
        }, null);

        console.log("redirect", authorizeUrl);
        res.redirect(authorizeUrl);
    },

};
