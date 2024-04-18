import mongoose from "mongoose";

const { Schema } = mongoose;

const itemSchema = new Schema({
  userCookieId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item: { item0 : {itemLevel : Number , attackPower : Number}, 
          item1 : {itemLevel : Number , attackPower : Number},
          item2 : {itemLevel : Number , attackPower : Number}
        },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
