import express from "express";

import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getUser);
router.delete("/:id", userController.deleteUser);
router.post("/nameChanger", userController.changeUserName);

export default router;
