// app.js
// Note to self: this file creates the Express app and wires middleware + routes

const express = require("express");

const userRoutes = require("./routes/api/userRoutes");
const projectRoutes = require("./routes/api/projectRoutes");
const taskRoutes = require("./routes/api/taskRoutes");

const app = express();

// Note to self: parse JSON request bodies
app.use(express.json());

// Note to self: health check
app.get("/", (req, res) => {
  res.json({ message: "TaskMaster API running" });
});

// Note to self: mount routers (these MUST export a router function)
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);

module.exports = app;
