const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// GET all tasks for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

// CREATE task
router.post("/", auth, async (req, res) => {
  try {
    const {
      title,
      description,
      employee,
      store,
      status,
      priority,
      dueDate,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    if (!employee?.trim()) {
      return res.status(400).json({
        message: "Employee is required",
      });
    }

    if (!store?.trim()) {
      return res.status(400).json({
        message: "Store is required",
      });
    }

    if (!dueDate) {
      return res.status(400).json({
        message: "Due date is required",
      });
    }

    const task = await Task.create({
      user: req.user.id,
      title: title.trim(),
      description: description?.trim() || "",
      employee: employee.trim(),
      store: store.trim(),
      status: status || "Pending",
      priority: priority || "Medium",
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      });
    }

    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

// UPDATE task
router.put("/:id", auth, async (req, res) => {
  try {
    const {
      title,
      description,
      employee,
      store,
      status,
      priority,
      dueDate,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    if (!employee?.trim()) {
      return res.status(400).json({
        message: "Employee is required",
      });
    }

    if (!store?.trim()) {
      return res.status(400).json({
        message: "Store is required",
      });
    }

    if (!dueDate) {
      return res.status(400).json({
        message: "Due date is required",
      });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        title: title.trim(),
        description: description?.trim() || "",
        employee: employee.trim(),
        store: store.trim(),
        status: status || "Pending",
        priority: priority || "Medium",
        dueDate,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Update task error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      });
    }

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

// CHANGE STATUS
router.patch("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "In Progress",
      "Completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid task status",
      });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Change status error:", error);

    res.status(500).json({
      message: "Failed to change task status",
    });
  }
});

// DELETE task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

module.exports = router;