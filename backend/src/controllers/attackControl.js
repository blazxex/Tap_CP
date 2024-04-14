import User from "../models/userModel.js";
import Item from "../models/itemModel.js";
import ScoreBoard from "../models/scoreBoardModel.js";
import Boss from "../models/bossModel.js";

export const userAttack = async (req, res) => {
  const { userCookieId, bossId } = req.body;

  try {
    // Retrieve the user item and boss concurrently
    const [userItem, boss] = await Promise.all([
      Item.findOne({ userCookieId: userCookieId }).lean(),
      Boss.findOne({ bossId: bossId }).lean(),
    ]);

    if (!userItem) {
      return res.status(404).json({ error: "User item not found" });
    }

    if (!boss) {
      return res.status(404).json({ error: "Boss not found" });
    }

    // Update user's last activation time and boss's HP concurrently
    const currentTime = Date.now();
    const updatedUserPromise = User.findOneAndUpdate(
      { userCookieId: userCookieId },
      { $set: { lastActivate: currentTime } },
      { new: true }
    );

    boss.currentHp = Math.max(0, boss.currentHp - userItem.attackPower);
    const updatedBossPromise = Boss.findByIdAndUpdate(boss._id, boss);

    // Update the user's score
    const updatedScoreBoardPromise = ScoreBoard.findOneAndUpdate(
      { userCookieId: userCookieId },
      { $inc: { score: userItem.attackPower } },
      { new: true, upsert: true }
    );

    // Execute updates concurrently
    const [updatedUser, updatedBoss, updatedScoreBoard] = await Promise.all([
      updatedUserPromise,
      updatedBossPromise,
      updatedScoreBoardPromise,
    ]);

    if (!updatedScoreBoard) {
      return res.status(404).json({ error: "Score update failed" });
    }

    // Return success response
    res.status(200).json({
      message: "Attack successful",
      user: updatedUser,
      boss: updatedBoss,
      score: updatedScoreBoard.score,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
