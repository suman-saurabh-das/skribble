const asyncHandler = require("express-async-handler");
const Scribble = require("../models/scribbleModel");

const getAllScribbles = asyncHandler(async (req, res) => {
  const allScribbles = await Scribble.find({ user: req.user._id });
  res.json(allScribbles);
});

const createScribble = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  // Check if all fields have data
  if ((!title, !content, !category)) {
    res.status(400);
    throw new Error("Please fill all the fields!");
  } else {
    // NOTE: req has the user details because they are added from authMiddleware
    // Create a new scribble
    const scribble = new Scribble({
      user: req.user._id,
      title,
      content,
      category,
    });
    const createdScribble = await scribble.save();
    res.status(201).json(createdScribble);
  }
});

module.exports = {
  getAllScribbles,
  createScribble,
};
