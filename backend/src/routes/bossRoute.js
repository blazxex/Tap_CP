import express from "express";

import * as bossControl from "../controllers/bossController.js";

const router = express.Router();

router.get("/", bossControl.createBoss);

export default router;
