const express = require("express");
const Task = require("../../models/Task");
const Project = require("../../models/Project");
const { authRequired } = require("../../utils/auth");

const router = express.Router();

// All task routes require authentication
router.use(authRequired);

// CREATE task under a project
router.post("/projects/:projectId/tasks", async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const task = await Task.create({
      title,
      description: description || "",
      status: status || "To Do",
      project: project._id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all tasks for a project
router.get("/projects/:projectId/tasks", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const tasks = await Task.find({ project: project._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE task (check ownership via parent project)
router.put("/tasks/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const project = await Project.findById(task.project);

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description;
    task.status = req.body.status ?? task.status;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE task
router.delete("/tasks/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const project = await Project.findById(task.project);

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
// routes/api/taskRoutes.js
// Note to self: routes for creating, reading, updating, deleting tasks