import { Router } from "express";

import { checkController, homeController, userController } from "./controllers";

const router = Router();

// check
router.get("/check", checkController.getCheckPage);

// home
router.get("/", homeController.getHomePage);

// user
router.get("/", userController.getAll);
router.get("/:id", userController.getById);

export default router;
