import axios from "axios";
import config from "../config";

const collection = "users";

export const userData = {

    getAll: async () => {
        // const db = await mongoService.getDb();

        // return  await db.collection(collection).find().toArray();
        try {
            const response =  await axios.get(config.apiRootUrl + "/api/v1/users");
            const users = response.data;
            return users;
        } catch (e) {
            console.log(e.message);
            return [{name: "err"}];
        }

        // return [{name: "user1"}];
        // return users;
    },

    // // ---------- CRUD ----------
    getById: async (id: any) => {
        // const db = await mongoService.getDb();
        // id = mongoService.normalizedId(id);
        // return await db.collection(collection).findOne({ _id: id });
        return {name: "user2"};
    },

};
