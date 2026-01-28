// server.js
// Note to self: this is the entry point that loads env, connects DB, and starts the server

require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

async function startServer() {
  try {
    // Note to self: connect DB first so we don't run without a database
    await connectDB(MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  }
}

startServer();
