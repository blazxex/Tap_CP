import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  userCookieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  userName: String,
  lastActivate: Date,
  ip: String,
});

const User = mongoose.model("User", userSchema);

export default User;
