// routes/api/taskRoutes.js
// Note to self: router placeholder so app can boot without crashing

const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ message: "tasks route ok" });
});

module.exports = router;
