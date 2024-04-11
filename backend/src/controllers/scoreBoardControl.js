import ScoreBoard from "../models/scoreBoardModel.js";

export const updateScoreBoard = async (req, res) => {
  try {
    const { userId, score } = req.body;

    const updatedScoreBoard = await ScoreBoard.findOneAndUpdate(
      { userId: userId },
      { score: score },
      { new: true }
    );

    if (!updatedScoreBoard) {
      return res
        .status(404)
        .json({ error: "Scoreboard entry not found for the user." });
    }

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
