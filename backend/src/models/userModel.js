import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  userCookieId: mongoose.Types.ObjectId,
  userName: String,
  lastActivate: Date,
  ip: String,
});

const User = mongoose.model("User", userSchema);

export default User;
