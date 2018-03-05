import { userData } from "../data";

export const userService = {

    getAll: async () => {
        const users = await userData.getAll();
        return(users);
    },

    getById: async (id: any) => {
        const user = await userData.getById(id);
        return(user);
    },

};
