const mongoose = require("mongoose"); // Importing mongoose library to interact with MongoDB

// Defining an async function to connect to the MongoDB database
const connectDB = async () => {
  // Attempting to connect to MongoDB using the connection URI stored in an environment variable.
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    // If successful, log a success message
    console.log(`Connected to MongoDB ${con.connection.host}`);
  } catch (error) {
    // If connection fails, log the error and exit the process
    console.log(`Error while connecting to MongoDB: ${error}`);
    process.exit(); // Terminates the Node.js process
  }
};

// Exporting the connectDB function to use in server.js
module.exports = connectDB;
