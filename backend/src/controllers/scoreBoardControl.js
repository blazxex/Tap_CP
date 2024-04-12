import ScoreBoard from "../models/scoreBoardModel.js";

export const updateScoreBoard = async (req, res) => {
  try {
    const { userId, score } = req.body;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(userId) || typeof score !== "number") {
      return res.status(400).json({ error: "Invalid userId or score" });
    }

    const updatedScoreBoard = await ScoreBoard.findOneAndUpdate(
      { userId: userId },
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
