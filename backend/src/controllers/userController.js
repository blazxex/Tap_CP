import User from "../models/userModel.js";
import Item from "../models/itemModel.js";
import ScoreBoard from "../models/scoreBoardModel.js";

export const createUser = async (req, res) => {
  try {
    //init user data
    const { userCookieId, userName, ip } = req.body;
    const d = new Date();
    let time = d.getTime();
    const newUser = new User({
      userCookieId: userCookieId,
      userName: userName,
      lastActivate: time,
      ip: ip,
    });
    await newUser.save();

    //init user item
    const newItem = new Item({
      userCookieId: newUser.userCookieId,
      item: "Initial Item",
      itemLevel: 1,
      attackPower: 1,
    });
    await newItem.save();

    //init user score
    const newScore = new ScoreBoard({
      userCookieId: newUser.userCookieId,
      score: 0,
      userName: newUser.userName,
    });
    await newScore.save();

    res.status(200).json({ message: "User created successfully." });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request - Validation Error" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const getUser = async (req, res) => {
  const userCookieId = req.query.userCookieId;

  if (!userCookieId) {
    return res.status(400).json({ message: "No userCookieId provided" });
  }

  try {
    const user = await User.findOne({ userCookieId: userCookieId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
