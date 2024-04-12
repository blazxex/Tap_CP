import mongoose from "mongoose";

const { Schema } = mongoose;

const bossSchema = new Schema({
  bossId: Number,
  bossName: String,
  totalHp: Number,
  currentHp: Number,
  nextBoss: String, // Assuming this is a reference or name to the next boss
});

const Boss = mongoose.model("Boss", bossSchema);
export default Boss;
