// config/db.js
// Note to self: this file handles connecting to MongoDB using Mongoose

const mongoose = require("mongoose");

async function connectDB(mongoUri) {
  // Note to self: if mongoUri is missing, fail early with a clear message
  if (!mongoUri) {
    throw new Error("MONGO_URI is missing. Check your .env file.");
  }

  // Note to self: connect to the database; if it fails it will throw an error
  await mongoose.connect(mongoUri);

  console.log("MongoDB connected");
}

module.exports = connectDB;
