// app.js
// Note to self: this file creates the Express app and wires middleware + routes

const express = require("express");

const userRoutes = require("./routes/api/userRoutes");
const projectRoutes = require("./routes/api/projectRoutes");
const taskRoutes = require("./routes/api/taskRoutes");

const app = express();

// Note to self: this lets Express read JSON from request bodies
app.use(express.json());

// Note to self: simple test route to confirm server is running
app.get("/", (req, res) => {
  res.json({ message: "TaskMaster API running" });
});

// Note to self: route wiring
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);

// Note to self: fallback route handler (404)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
