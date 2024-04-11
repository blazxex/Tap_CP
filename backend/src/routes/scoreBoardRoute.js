import express from "express";

import * as scoreBoardController from "../controllers/scoreBoardControl.js";

const router = express.Router();

router.get("/", scoreBoardController.getScoreBoard);
router.post("/", scoreBoardController.updateScoreBoard);

export default router;
