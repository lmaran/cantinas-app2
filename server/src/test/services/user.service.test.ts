import { expect } from "chai";
import * as sinon from "sinon";

import { userService } from "../../services";
import { userData } from "../../data"; // for stub

describe ("User Service", () => {
    // Modules are cached after the first time they are loaded, so you can just
    // load them first in your test file and stub them using a library like sinon.
    // https://stackoverflow.com/a/42498606

    let userDataStub: any;

    it("should exist", () => {
        // expect(userService).to.exist;
    });

    describe("getAll", () => {
        beforeEach(() => {
            userDataStub = sinon.stub(userData, "getAll");
        });

        afterEach(() => {
            userDataStub.restore();
        });

        it("should return data 1", async () => {
            const expectedData = [{ name: "user 1" }];
            userDataStub.returns(expectedData);
            const users = await userService.getAll();
            expect(users).deep.equal(expectedData);
        });

    });

    describe("getById", () => {
        beforeEach(() => {
            userDataStub = sinon.stub(userData, "getById");
        });

        afterEach(() => {
            userDataStub.restore();
        });

        it("should return data 1", async () => {
            const expectedData = { name: "user 1" };
            userDataStub.returns(expectedData);
            const users = await userService.getById(1);
            expect(users).deep.equal(expectedData);
        });

    });

});
