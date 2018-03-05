import { Request, Response } from "express";
import * as sinon from "sinon";
import { expect } from "chai";

import { userController } from "../../controllers";
import { userService } from "../../services";

let req: Partial<Request>;
let res: Partial<Response>;

describe("User Controller", () => {
    let userServiceStub: any;

    beforeEach(() => {
        req = {
            // method: 'GET',
            // url: '/user/42',
            params: {
                id: 1234,
            },
        };
        res = {
            json: sinon.spy(),
            status: (x: number): Response => {
                res.statusCode = x;
                return res as Response;
            },
        };
    });

    afterEach(() => {
        // userServiceStub.restore();
    });

    it("should exist", () => {
        // expect(userController).to.exist;
    });

    describe("getAll", () => {
        it("should send json on successful retrieve", async () => {
            const expectedData = [{ name: "aaa" }];
            userServiceStub = sinon.stub(userService, "getAll").returns(expectedData);
            await userController.getAll(req as Request, res as Response);

            const xxx = res.json as sinon.SinonSpy;
            sinon.assert.calledWith(res.json as sinon.SinonSpy, [{ name: "aaa" }]);
            // expect(xxx.calledWith(getAllMock)).to.be.true;

            // expect(res.statusCode).equal(200);
            userServiceStub.restore();
        });
    });

    describe("getById", () => {
        it("should send json on successful retrieve", async () => {
            const expectedData = { name: "aaa" };
            userServiceStub = sinon.stub(userService, "getById").returns(expectedData);

            await userController.getById(req as Request, res as Response);

            sinon.assert.calledWith(res.json as sinon.SinonSpy, expectedData);

            // expect(res.statusCode).equal(200);
            userServiceStub.restore();
        });
    });
});
