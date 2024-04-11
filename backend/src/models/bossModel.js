import mongoose from "mongoose";
import scoreBoardSchema from "./scoreBoardModel";
import lastAttackUserSchema from "./lastAttackUserModel";
const { Schema } = mongoose;

const bossSchema = new Schema({
  bossId: Number,
  bossName: String,
  totalHp: Number,
  currentHp: Number,
  nextBoss: String, // Assuming this is a reference or name to the next boss
  scoreBoard: [scoreBoardSchema], // An array of ScoreBoard documents
  lastAttackUser: lastAttackUserSchema, // A subdocument for Last_Attack_User
});

const Boss = mongoose.model("Boss", bossSchema);
export default Boss;
