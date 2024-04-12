import mongoose from "mongoose";

const { Schema } = mongoose;

const itemSchema = new Schema({
  userCookieId: mongoose.Types.ObjectId,
  item: String,
  itemLevel: Number,
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
