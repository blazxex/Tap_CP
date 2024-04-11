import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const newUser = new User({
      userCookieId: req.body.userCookieId,
      userName: req.body.userName,
      lastActivate: req.body.lastActivate,
      ip: req.body.ip,
      item: req.body.item,
      itemLevel: req.body.itemLevel,
      userScore: req.body.userScore,
    });

    await newUser.save();
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
  const users = await User.find();

  res.status(200).json(users);
};
