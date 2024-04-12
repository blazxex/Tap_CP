import User from "../models/userModel.js";
import Item from "../models/itemModel.js";
import ScoreBoard from "../models/scoreBoardModel.js";
import { updateScoreBoard } from "./scoreBoardControl.js";
import Boss from "../models/bossModel.js";

export const userAttack = async (req, res) => {
  const { userCookieId, bossId } = req.body;

  try {
    const userItem = await Item.findOne({ userCookieId: userCookieId });
    if (!userItem) {
      return res.status(404).json({ error: "User item not found" });
    }

    const itemLevel = userItem.itemLevel;
    const boss = await Boss.findOne({ bossId: bossId });
    if (!boss) {
      return res.status(404).json({ error: "Boss not found" });
    }

    boss.currentHp = Math.max(0, boss.currentHp - itemLevel);
    await boss.save();

    // Update the user's score
    const scoreUpdateReq = {
      body: { userCookieId, score: itemLevel },
      user: { userCookieId: userCookieId },
    };
    const scoreUpdateRes = {
      status: () => ({ json: (msg) => console.log(msg) }),
    };
    const updatedScoreBoard = await updateScoreBoard(
      scoreUpdateReq,
      scoreUpdateRes
    );

    if (!updatedScoreBoard) {
      return res.status(500).json({ error: "Failed to update score" });
    }

    // Return success response
    res.status(200).json({
      message: "Attack successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
