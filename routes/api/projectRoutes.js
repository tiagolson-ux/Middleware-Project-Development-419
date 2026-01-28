const express = require("express");
const Project = require("../../models/Project");
const { authRequired } = require("../../utils/auth");

const router = express.Router();

// Note to self: ALL project routes require authentication
router.use(authRequired);

// CREATE project
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = await Project.create({
      name,
      description: description || "",
      user: req.user.id, // ownership
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all projects owned by user
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single project (ownership enforced)
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE project
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    project.name = req.body.name ?? project.name;
    project.description = req.body.description ?? project.description;

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
// routes/api/projectRoutes.js
// Note to self: routes for creating, reading, updating, deleting projects
