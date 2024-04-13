import mongoose from "mongoose";

const { Schema } = mongoose;

const bossSchema = new Schema({
  bossId: mongoose.Types.ObjectId,
  bossName: String,
  totalHp: Number,
  currentHp: Number,
});

const Boss = mongoose.model("Boss", bossSchema);
export default Boss;
