import mongoose from "mongoose";

const { Schema } = mongoose;

const scoreBoardSchema = new Schema({
  rank: Number,
  userName: String,
  userId: mongoose.Types.ObjectId, // Assuming User_ID is an ObjectId linking to a User collection
});

const ScoreBoard = mongoose.model("ScoreBoard", scoreBoardSchema);

export default ScoreBoard;
