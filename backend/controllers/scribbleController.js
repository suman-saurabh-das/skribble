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

const getScribbleById = asyncHandler(async (req, res) => {
  // Find the scribble by id
  const scribble = await Scribble.findById(req.params.id);

  if (scribble) {
    // Check if the scribble belongs to currently logged in user
    if (scribble.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You cannot access this scribble!");
    }
    res.json(scribble);
  } else {
    res.status(404).json({ message: "Scribble not found!" });
  }
});

const editScribble = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  // Check if all fields have data
  if ((!title, !content, !category)) {
    res.status(400);
    throw new Error("Please fill all the fields!");
  }

  // Find the scribble by id
  const scribble = await Scribble.findById(req.params.id);

  // Check if the scribble belongs to currently logged in user
  if (scribble.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action!");
  }

  // Update the scribble
  if (scribble) {
    scribble.title = title;
    scribble.content = content;
    scribble.category = category;
    const updatedScribble = await scribble.save();
    res.json(updatedScribble);
  } else {
    res.json(404);
    throw new Error("Scribble not found!");
  }
});

const deleteScribble = asyncHandler(async (req, res) => {
  // Find the scribble by id
  const scribble = await Scribble.findById(req.params.id);

  // Check if the scribble belongs to currently logged in user
  if (scribble.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action!");
  }

  // Remove the scribble
  if (scribble) {
    await scribble.deleteOne();
    res.json({ message: "Scribble removed!" });
  } else {
    res.json(404);
    throw new Error("Scribble not found!");
  }
});

module.exports = {
  getAllScribbles,
  createScribble,
  getScribbleById,
  editScribble,
  deleteScribble,
};
