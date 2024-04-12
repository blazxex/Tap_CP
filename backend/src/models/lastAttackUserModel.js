import mongoose from "mongoose";

const { Schema } = mongoose;
const lastAttackUserSchema = new Schema({
  userCookieId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: String,
  userScore: Number,
});

const LastAttackUser = mongoose.model("LastAttackUser", lastAttackUserSchema);

export default LastAttackUser;
