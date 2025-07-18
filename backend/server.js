// Load environment variables from a .env file into process.env
require("dotenv").config();

const express = require("express"); // Import express module, a web framework for node.js
const connectDB = require("./config/db"); // Import fn to connect to mongoDB
const userRoutes = require("./routes/userRoutes");
const scribbleRoutes = require("./routes/scribbleRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express(); // Create an Express application instance
connectDB(); // Connect to mongoDB

app.use(express.json()); // Adding middleware express.json() to access data from req body

// GET route for root path
app.get("/", (req, res) => {
  res.send("Server is running !");
});

// api routes for users
app.use("/api/users", userRoutes);
// api routes for scribbles
app.use("/api/scribbles", scribbleRoutes);

// Adding custom middleware for error handling
app.use(notFound); 
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // Define port from .env file (defaults to 5000)

// Start server and log a message once it's running
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
