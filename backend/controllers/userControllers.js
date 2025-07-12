const asyncHandler = require("express-async-handler"); // Used for handling errors
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  // Taking inputs from user
  const { name, email, password, pic } = req.body;

  // Check if user is already there in DB
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists with the email !");
  }

  const user = await User.create({ name, email, password, pic });
  if (user) {
    res.status(201).json({
      _id: user.id,
      pic: user.pic,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Error creating user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password !");
  }
});

module.exports = { registerUser, authUser };
