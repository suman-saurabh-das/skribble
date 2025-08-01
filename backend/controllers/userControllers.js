const asyncHandler = require("express-async-handler"); // Used for handling errors
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  // Taking inputs from user
  const { name, email, password, pic } = req.body;

  // Find user in DB using email & check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists with the email !");
  }

  // Create a new user
  const user = await User.create({ name, email, password, pic });

  if (user) {
    res.status(201).json({
      _id: user._id,
      pic: user.pic,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error creating user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  // Taking inputs from user
  const { email, password } = req.body;

  // Find user in DB using email
  const user = await User.findOne({ email });

  // Check if password entered by user is correct
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password !");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  // Find currently logged in user using the id of the user from req body
  // This info gets added to the req body from the authMiddleware (protect fn)
  const user = await User.findById(req.user._id);

  if (user) {
    // Taking inputs from user
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

module.exports = { registerUser, authUser, updateUserProfile };
