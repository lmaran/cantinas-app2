import { Request, Response } from "express";
import { userService } from "../services";

export const userController = {

    getAll: async (req: Request, res: Response) => {

        // userService.getAll(function(users: any){
        //      res.json([{name: "aaa"}]);
        // })

        const users = await userService.getAll();
        // res.status(200);
        res.json(users);

        // res.json([{name: "aaa1234567"}]);
    },

    getById: async (req: Request, res: Response) => {
        const userId = req.params.id;

        const user = await userService.getById(userId);
        res.json(user);

        // res.json({name: "aaa"});
    },

};
