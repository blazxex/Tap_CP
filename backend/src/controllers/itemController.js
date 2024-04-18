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
  const { userCookieId, index } = req.body;
  let itemName = "Initial Item_" + (index + 1); // Assuming item names are styled as "Initial Item_1", etc.

  try {
    const itemField = `item.item_${index}`; // Correct path to the item fields
    const item = await Item.findOne({ userCookieId });

    if (!item || !item.item || !item.item[`item_${index}`]) {
      return res.status(404).json({ message: "Item not found" });
    }

    const currentLevel = item.item[`item_${index}`].itemLevel;
    const itemLevel = currentLevel + 1;
    const attackPower = getAttackPower(itemName, itemLevel);

    let update = {};
    update[`${itemField}.attackPower`] = attackPower; // Dot notation for nested fields
    update[`${itemField}.itemLevel`] = itemLevel; // Dot notation for nested fields

    const updatedItem = await Item.findOneAndUpdate(
      { userCookieId },
      { $set: update }, // Using $set to specify the fields to update
      { new: true }
    );

    if (updatedItem) {
      res.json({ message: "Item updated successfully", updatedItem });
    } else {
      res.status(404).json({ message: "Failed to update item" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing your request", error: error.message });
  }
};
