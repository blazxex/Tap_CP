import mongoose from "mongoose";

const { Schema } = mongoose;

const itemDetailSchema = new Schema({
  itemLevel: Number,
  attackPower: Number,
});

const itemSchema = new Schema({
  userCookieId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item_0: itemDetailSchema,
  item_1: itemDetailSchema,
  item_2: itemDetailSchema,
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
