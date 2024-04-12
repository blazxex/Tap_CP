import mongoose from "mongoose";
import Boss from "../models/bossModel.js"; // Ensure the path is correct

export const createBoss = async (req, res) => {
  try {
    const { bossName, totalHp, currentHp, nextBoss } = req.body;

    // Validate input
    if (
      typeof bossName !== "string" ||
      typeof totalHp !== "number" ||
      typeof currentHp !== "number" ||
      (nextBoss && !mongoose.Types.ObjectId.isValid(nextBoss))
    ) {
      return res.status(400).json({ error: "Invalid data provided" });
    }

    const newBoss = new Boss({
      bossId: new mongoose.Types.ObjectId(),
      bossName,
      totalHp,
      currentHp,
      nextBoss: nextBoss ? new mongoose.Types.ObjectId(nextBoss) : null, // Convert nextBoss to ObjectId if provided
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
