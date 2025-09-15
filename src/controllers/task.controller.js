import mongoose from "mongoose";
import TaskModel from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch tasks." });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid task ID." });
    }

    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch the task." });
  }
};

export const createTask = async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);
    await newTask.save();
    return res.status(201).json(newTask);
  } catch (err) {
    return res.status(400).json({ error: "Failed to create task.", details: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid task ID." });
    }

    const allowedUpdates = ["isCompleted"];
    const requestedUpdates = Object.keys(req.body);

    const isValidOperation = requestedUpdates.every((field) =>
      allowedUpdates.includes(field)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: "One or more fields are not editable." });
    }

    const task = await TaskModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update task." });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid task ID." });
    }

    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found." });
    }

    return res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete task." });
  }
};
