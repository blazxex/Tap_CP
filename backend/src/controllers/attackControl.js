import User from "../models/userModel.js";
import Item from "../models/itemModel.js";
import ScoreBoard from "../models/scoreBoardModel.js";
import { updateScoreBoard } from "./scoreBoardControl.js";
import Boss from "../models/bossModel.js";

export const userAttack = async (req, res) => {
  const { userId, bossId } = req.body;

  try {
    const userItem = await Item.findOne({ userCookieId: userId });
    if (!userItem) {
      return res.status(404).json({ error: "User item not found" });
    }

    const itemLevel = userItem.itemLevel;

    // Update the boss's currentHp
    const boss = await Boss.findById(bossId);
    if (!boss) {
      return res.status(404).json({ error: "Boss not found" });
    }

    boss.currentHp = Math.max(0, boss.currentHp - itemLevel); // Ensure HP doesn't go below zero
    await boss.save();

    // Update the user's score
    const scoreUpdateReq = {
      body: { userId, score: itemLevel },
      user: { _id: userId },
    };
    const scoreUpdateRes = {
      status: () => ({ json: (msg) => console.log(msg) }),
    };
    await updateScoreBoard(scoreUpdateReq, scoreUpdateRes);

    // Return success response
    res.status(200).json({
      message: "Attack successful",
      bossCurrentHp: boss.currentHp,
      userScore: updatedScoreBoard.score,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
