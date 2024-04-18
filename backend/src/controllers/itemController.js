import Item from "../models/itemModel.js";

const attackPowerMap = new Map([
  ["Initial Item_1", 1],
  ["Initial Item_2", 20],
  ["Initial Item_3", 25],
  ["Axe_2", 30],
]);
//i am cuming
// Function to get attackPower from the map
function getAttackPower(itemName, itemLevel) {
  return attackPowerMap.get(`${itemName}_${itemLevel}`) || 5;
}

export const getItems = async (req, res) => {
  const { userCookieId } = req.body;
  const items = await Item.findOne({
    userCookieId: userCookieId,
  });

  res.status(200).json(items);
};

export const updateItem = async (req, res) => {
  try {
    const { userCookieId, index } = req.body;
    let itemName = "item_" + index;
    const items = await Item.findOne({
      userCookieId: userCookieId,
    });
    let item;
    switch (index) {
      case 0:
        item = items.item.item_0;
        break;
      case 1:
        item = items.item.item_1;
        break;
      case 2:
        item = items.item.item_2;
        break;
    }
    const itemLevel = parseInt(item.itemLevel) + 1;
    const attackPower = getAttackPower(itemName, itemLevel);

    let update = {};
    update[item.attackPower] = attackPower;
    update[item.itemLevel] = itemLevel;

    const updatedItem = await Item.findOneAndUpdate(
      { userCookieId: userCookieId },
      update,
      { new: true }
    );

    console.log(updateItem);

    if (updatedItem) {
      res.json({ message: "Item updated successfully", updatedItem });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing your request", error: error.message });
  }
};
