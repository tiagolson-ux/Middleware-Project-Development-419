// routes/api/userRoutes.js
// Note to self: router placeholder so app can boot without crashing

const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ message: "users route ok" });
});

module.exports = router;
// server.js
// Note to self: entry point that loads env, connects DB, then starts Express

require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  }
}

startServer();
