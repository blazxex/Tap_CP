import mongoose from "mongoose";
import Boss from "../models/bossModel.js"; // Ensure the path is correct
function getRandomBossName() {
  const names = [
    "mockBoss1",
    "mockBoss2",
    "mockBoss3",
    "mockBoss4",
    "mockBoss5",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomHealth() {
  return (Math.floor(Math.random() * 100) + 50) * 10;
}
export const createBoss = async (req, res) => {
  try {
    const bossName = getRandomBossName();
    const totalHp = getRandomHealth();
    const currentHp = totalHp;

    const newBoss = new Boss({
      bossId: new mongoose.Types.ObjectId(),
      bossName,
      totalHp,
      currentHp,
    });

    // Save the new boss to the database
    await newBoss.save();

    // Respond with the newly created boss document
    res.status(201).json(newBoss);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCurrentBoss = async (req, res) => {
  try {
    const boss = await Boss.findOne().sort({ createdAt: -1 });

    if (!boss) {
      return res.status(404).json({ error: "No boss found" });
    }

    res.status(200).json(boss);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
