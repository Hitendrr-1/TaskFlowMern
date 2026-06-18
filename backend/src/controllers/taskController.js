const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate,
      user: req.user.id,
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (
      task.user.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const updatedTask =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    return res.status(200).json(
      updatedTask
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (
      task.user.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await Task.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      message:
        "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};