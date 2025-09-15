import mongoose from "mongoose";
import * as taskService from "../services/task.service.js";

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      const error = new Error("Invalid task ID");
      error.statusCode = 400;
      throw error;
    }

    const task = await taskService.getTaskById(id);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      const error = new Error("Invalid task ID");
      error.statusCode = 400;
      throw error;
    }

    const updatedTask = await taskService.updateTask(id, req.body);
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      const error = new Error("Invalid task ID");
      error.statusCode = 400;
      throw error;
    }

    await taskService.deleteTask(id);
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    next(err);
  }
};
