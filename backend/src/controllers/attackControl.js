import User from "../models/userModel.js";
import Item from "../models/itemModel.js";
import ScoreBoard from "../models/scoreBoardModel.js";

import Boss from "../models/bossModel.js";

export const userAttack = async (req, res) => {
  const { userCookieId, bossId } = req.body;

  try {
    const userItem = await Item.findOne({ userCookieId: userCookieId });
    if (!userItem) {
      return res.status(404).json({ error: "User item not found" });
    }

    const attackPower = userItem.attackPower;
    const boss = await Boss.findOne({ bossId: bossId });
    if (!boss) {
      return res.status(404).json({ error: "Boss not found" });
    }

    boss.currentHp = Math.max(0, boss.currentHp - attackPower);
    await boss.save();

    // Update the user's score
    const updatedScoreBoard = await ScoreBoard.findOneAndUpdate(
      { userCookieId: userCookieId },
      { $inc: { score: attackPower } }, // Increment score
      { new: true, upsert: true } // Create a new entry if one doesn't exist
    );
    if (!updatedScoreBoard) {
      return res.status(404).json({ error: "Scre update failed" });
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
