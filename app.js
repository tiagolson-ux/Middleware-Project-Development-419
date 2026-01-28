// Note to self: app.js builds the Express app and mounts routes.
// Note to self: server.js is responsible for starting the app and connecting the DB.

const express = require("express");

const userRoutes = require("./routes/api/userRoutes");
const projectRoutes = require("./routes/api/projectRoutes");
const taskRoutes = require("./routes/api/taskRoutes");

const app = express();

// Note to self: built-in middleware to parse JSON request bodies
app.use(express.json());

// Note to self: quick health check route so we can confirm the server responds
app.get("/", (req, res) => {
  res.status(200).json({ message: "TaskMaster API running" });
});

// Note to self: mount API route modules
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);

module.exports = app;
