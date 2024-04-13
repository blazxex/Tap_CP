import express from "express";

import * as itemController from "../controllers/itemController.js";

const router = express.Router();

router.post("/", itemController.getItems);
router.post("/update", itemController.updateItem);

// TODO3: add a router for the filter function

export default router;
