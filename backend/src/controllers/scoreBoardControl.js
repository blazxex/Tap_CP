import ScoreBoard from "../models/scoreBoardModel.js";
import mongoose from "mongoose";

export const updateScoreBoard = async (req, res) => {
  try {
    const { userCookieId, score } = req.body;

    // Validate input
    if (
      !mongoose.Types.ObjectId.isValid(userCookieId) ||
      typeof score !== "number"
    ) {
      return res.status(400).json({ error: "Invalid userCookieId or score" });
    }

    const updatedScoreBoard = await ScoreBoard.findOneAndUpdate(
      { userCookieId: userCookieId },
      { $inc: { score: score } }, // Increment score
      { new: true, upsert: true } // Create a new entry if one doesn't exist
    );

    res.status(200).json(updatedScoreBoard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getScoreBoard = async (req, res) => {
  try {
    const topScores = await ScoreBoard.find()
      .sort({ score: -1 }) // Sort by score in descending order
      .limit(5);

    res.status(200).json(topScores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
