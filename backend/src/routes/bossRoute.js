import express from "express";

import * as bossControl from "../controllers/bossControl.js";

const router = express.Router();

router.post("/", bossControl.createBoss);

export default router;
