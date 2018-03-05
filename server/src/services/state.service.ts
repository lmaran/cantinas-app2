import { mongoHelper } from "../helpers";
import * as _ from "lodash";

const collection = "state";
export const stateService = {

    // getAll: async () => {
    //     const db = await mongoService.getDb();

    //     return  await db.collection(collection).find().toArray();
    // },

    create: async (state: any) => {
        const db = await mongoHelper.getDb();
        return await db.collection(collection).insertOne(state);
    },

    get: async (id: string) => {
        const db = await mongoHelper.getDb();
        return await db.collection(collection).findOne({ state: id});
    },

    delete: async (id: string) => {
        const db = await mongoHelper.getDb();
        const result = await db.collection(collection).deleteOne({ state: id });
        return result.deletedCount;
    },
};
