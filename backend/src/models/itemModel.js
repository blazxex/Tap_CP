import mongoose from "mongoose";

const { Schema } = mongoose;

const itemSchema = new Schema({
  userCookieId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item: {
    item_0: { itemLevel: Number, attackPower: Number, price : Number },
    item_1: { itemLevel: Number, attackPower: Number, price : Number },
    item_2: { itemLevel: Number, attackPower: Number, price : Number },
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
