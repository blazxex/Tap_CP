import mongoose from "mongoose";

const { Schema } = mongoose;

const itemSchema = new Schema({
  userCookieId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item: String,
  itemLevel: Number,
  attackPower: Number,
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
