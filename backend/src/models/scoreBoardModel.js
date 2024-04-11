import mongoose from "mongoose";

const { Schema } = mongoose;

const scoreBoardSchema = new Schema({
  score: Number,
  userName: String,
  userId: mongoose.Types.ObjectId,
});

const ScoreBoard = mongoose.model("ScoreBoard", scoreBoardSchema);

export default ScoreBoard;
