import express from "express";

import * as bossControl from "../controllers/bossController.js";

const router = express.Router();

router.get("/", bossControl.createBoss);
router.get("/current", bossControl.getCurrentBoss);

export default router;
