import mongoose from "mongoose";

const { Schema } = mongoose;

const scoreBoardSchema = new Schema({
  userCookieId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  score: Number,
  userName: String,
});

const ScoreBoard = mongoose.model("ScoreBoard", scoreBoardSchema);

export default ScoreBoard;
