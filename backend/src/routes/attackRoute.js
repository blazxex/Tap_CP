import express from "express";

import * as attackController from "../controllers/attackControl.js";

const router = express.Router();

router.post("/", attackController.userAttack);

export default router;
