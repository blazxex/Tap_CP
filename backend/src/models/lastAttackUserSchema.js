import mongoose from "mongoose";

const { Schema } = mongoose;
const lastAttackUserSchema = new Schema({
  userId: mongoose.Types.ObjectId,
  userName: String,
  userScore: Number,
});

const LastAttackUser = mongoose.model("LastAttackUser", lastAttackUserSchema);

export default LastAttackUser;
