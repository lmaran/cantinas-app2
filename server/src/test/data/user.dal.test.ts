// import { Request, Response } from "express";
// import * as sinon from "sinon";
// import { expect, should } from "chai";
// import { ObjectID } from "mongodb";

// import userData from "./user.dal";
// import userService from "./user.service";

// describe("User DAL", () => {

//     describe("getAll", () => {
//         it("should return all data", async () => {

//             const expectedData: any = [
//                 {
//                     _id: new ObjectID("5a0b4d6e7f37f42883269ad6"),
//                     firastName: "Joe",
//                     lastName: "Doe",
//                     age: 46
//                 },
//                 {
//                     _id: new ObjectID("5a0dd8937f37f42883269ade"),
//                     firstName: "Joe2",
//                     lastName: "Doe2",
//                     age: 462
//                 }
//             ];

//             const actualData = await userData.getAll();

//             expect(actualData).deep.equal(expectedData);
//             expect(actualData[0]).to.have.property("lastName");
//             expect(actualData).to.have.lengthOf(2);
//         });
//     });

//     describe("getById", () => {
//         it("should return data by ID", async () => {
//             const expectedData: any = {
//                 _id: new ObjectID("5a0b4d6e7f37f42883269ad6"),
//                 firstName: "Joe",
//                 lastName: "Doe",
//                 age: 46
//             };

//             const actualData = await userData.getById("5a0b4d6e7f37f42883269ad6");

//             expect(actualData).deep.equal(expectedData);
//             expect(actualData).to.have.property("lastName");
//         });
//     });

// });
