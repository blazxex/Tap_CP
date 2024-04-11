import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  userCookieId: String,
  userName: String,
  lastActivate: Date,
  ip: String,
  item: String,
  itemLevel: Number,
  userScore: Number,
});

const User = mongoose.model("User", userSchema);

export default User;
