import ScoreBoard from "../models/scoreBoardModel.js";
import mongoose from "mongoose";

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

export const getScore = async (req, res) => {
  const userCookieId = req.query.userCookieId;

  if (!userCookieId) {
    return res.status(400).json({ message: "No userCookieId provided" });
  }

  try {
    const user = await ScoreBoard.findOne({ userCookieId: userCookieId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error: error });
  }
};

export const updateScore = async (req, res) => {
  const { userCookieId, score } = req.body;

  // Validate that both userCookieId and score are provided
  if (!userCookieId || score === undefined) {
    return res.status(400).json({ message: "Missing userCookieId or score" });
  }

  // Optionally, validate that score is a number, not a string or other type
  if (typeof score !== "number") {
    return res.status(400).json({ message: "Invalid score type" });
  }

  try {
    const updatedScore = await ScoreBoard.findOneAndUpdate(
      { userCookieId: userCookieId }, // Adjusted based on the actual type of userCookieId
      { $set: { score: score } },
      { new: true }
    );

    if (updatedScore) {
      res
        .status(200)
        .json({ message: "Score updated successfully", data: updatedScore });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating score", error: error.message });
  }
};
