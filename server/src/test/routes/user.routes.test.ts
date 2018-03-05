import { expect } from "chai";
import * as request from "supertest";

import app from "../../app";

describe("User routes", () => {
    let res: request.Response;

    describe ("GET /api/v1/user", () => {
        it("should get an array", async () => {
            res = await request(app).get("/api/v1/user");
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array");
        });
    });

    describe ("GET /api/v1/user/:id", () => {
        it("should get an object", async () => {
            res = await request(app).get("/api/v1/user/123");
            expect(res.status).to.equal(200);
        });
    });

});
