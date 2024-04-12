import mongoose from "mongoose";

const { Schema } = mongoose;

const scoreBoardSchema = new Schema({
  userCookieId: mongoose.Types.ObjectId,
  score: Number,
  userName: String,
});

const ScoreBoard = mongoose.model("ScoreBoard", scoreBoardSchema);

export default ScoreBoard;
