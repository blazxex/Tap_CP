import mongoose from "mongoose";
import Boss from "../models/bossModel.js"; // Ensure the path is correct
function getRandomBossName() {
  const names = [
    "Al-kwharizmi",
    "Eijktra",
    "Kadane",
    "Grader",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomHealth() {
  return (Math.floor(Math.random() * 100) + 50) * 10;
}
function getRandomWeakness(){//0,1,2
  return (Math.floor(Math.random() * 3))
}
export const createBoss = async (req, res) => {
  try {
    const bossName = getRandomBossName();
    const totalHp = getRandomHealth();
    const currentHp = totalHp;
    var weakness;
    if(bossName === "Grader"){
      weakness = 3;
    }
    else{
      weakness = getRandomWeakness();
    }

    const newBoss = new Boss({
      bossId: new mongoose.Types.ObjectId(),
      bossName,
      totalHp,
      currentHp,
      weakness,
    });

    // Save the new boss to the database
    await newBoss.save();
    console.log(newBoss);
    // Respond with the newly created boss document
    res.status(200).json({message : "yo"});
  } catch (err) {
    // console.error(err);
    // res.status(500).json({ error: "Internal Server Error" });
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
