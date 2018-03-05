// import { Request, Response, NextFunction } from "express";
// import * as sinon from "sinon";
// import { expect } from "chai";

// import { checkController } from "../../controllers";

// let req: Partial<Request>;
// let res: Partial<Response>;
// let next: Partial<NextFunction>;

// describe("check Controller", () => {

//     beforeEach(() => {
//         req = {};
//         res = {
//             send: sinon.spy(),
//             json: sinon.spy(),
//         };
//         next = () => undefined;
//     });

//     describe("getCheckPage", () => {
//         it("should send json on successful retrieve", async () => {
//             await checkController.getCheckPage(req as Request, res as Response, next as NextFunction );
//             sinon.assert.calledWith(res.send as sinon.SinonSpy, "identity-service-" + (process.env.DEPLOYMENT_SLOT || "noslot") + "-" + process.env.NODE_ENV);
//         });
//     });

// });

//

//

//

// import { expect } from "chai";
// import * as request from "supertest";

// import app from "../../app";

// describe("Home routes", () => {
//     let res: request.Response;

//     describe ("GET /check", () => {
//         it("should get a string", async () => {
//             res = await request(app).get("/api/check");
//             expect(res.status).to.equal(200);
//             expect(res.text).contain("cantinas-app-");
//         });
//     });

// });
