import User from "../models/user.js";

export const create = async (req, res) => {
  const { name, email, password } = req.body;
  const olderUser = await User.findOne({ email });
  if (olderUser) {
    res.status(401).json({ error: "Email is already in use" });
  }
  const newUser = new User({ name, email, password });
  await newUser.save();
  res.staus(201).json({ user: newUser });
};
