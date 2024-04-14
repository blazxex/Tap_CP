import express from "express";

import * as scoreBoardController from "../controllers/scoreBoardController.js";

const router = express.Router();

router.get("/", scoreBoardController.getScoreBoard);
router.get("/user", scoreBoardController.getScore);

export default router;
