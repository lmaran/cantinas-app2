import * as _ from "lodash";
import { Request, Response } from "express";
// import * as request from "sync-request";
const request = require("sync-request");
import { getCookie } from "../helpers";

let userInfo;
let access_token;
let id_token;

const authServer = {
    // authorizationEndpoint: "http://localhost:1420/authorize",
    // tokenEndpoint: "http://localhost:1420/token",
    // revocationEndpoint: "http://localhost:1420/revoke",
    // registrationEndpoint: "http://localhost:1420/register",
    userInfoEndpoint: "http://localhost:1420/userinfo",
};

export const userinfoController = {
    // GET, POST
    getUserinfo: async (req: Request, res: Response) => {
        access_token = getCookie(req, "access_token");
        const id_token_str = getCookie(req, "id_token");
        if (id_token_str) {
            id_token = JSON.parse(id_token_str);
        }

        console.log("id_token:  -------");
        console.log(id_token);

        const headers = {
            Authorization: "Bearer " + access_token,
        };
        console.log("Auth-Header: " + headers.Authorization);

        const resource = request("GET", authServer.userInfoEndpoint, { headers });
        console.log("Resource status code: " + resource.statusCode);
        console.log(JSON.stringify(resource));

        if (resource.statusCode >= 200 && resource.statusCode < 300) {
            const body = JSON.parse(resource.getBody());
            console.log("Got data: ", body);

            userInfo = body;

            res.render("userinfo", { userInfo, id_token });
            return;
        } else {
            res.render("error", { error: "Unable to fetch user information" });
            return;
        }
    },
};
