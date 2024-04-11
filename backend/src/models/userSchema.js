import mongoose from "mongoose";
import bossSchema from "./bossSchema";
const { Schema } = mongoose;

const userSchema = new Schema({
  userCookieId: String,
  userName: String,
  lastActivate: Date,
  ip: String, // Assuming IP is a string; if IP data is more complex, adjust accordingly
  item: String,
  itemLevel: Number,
  userScore: Number,
  bossData: bossSchema, // Assuming a user can have a relation to a boss; adjust according to your data model
});

const User = mongoose.model("User", userSchema);

export default User;
