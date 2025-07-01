// Load environment variables from a .env file into process.env
require("dotenv").config();

const express = require("express"); // Import express module, a web framework for node.js
const notesData = require("./data/notes"); // Import sample notes data

const app = express(); // Create an Express application instance
const PORT = process.env.PORT || 5000; // Define port from .env file (defaults to 5000)

// Start server and log a message once it's running
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));

// GET route for root path
app.get("/", (req, res) => {
  res.send("App is running !");
});

// GET route that returns all notes data as JSON
app.get("/api/notes", (req, res) => {
  res.json(notesData);
});

// GET route to return a single note based on its _id
app.get("/api/notes/:id", (req, res) => {
  const note = notesData.find((note) => note._id === req.params.id);
  if (!note) {
    return res.status(404).send({ message: "Note not found" });
  }
  res.send(note);
});
