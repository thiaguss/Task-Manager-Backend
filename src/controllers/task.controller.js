import mongoose from "mongoose";
import * as taskService from "../services/task.service.js";

class TaskController {
  constructor(service) {
    this.service = service;
  }

  getTasks = async (req, res, next) => {
    try {
      const tasks = await this.service.getAllTasks();
      res.status(200).json(tasks);
    } catch (err) {
      next(err);
    }
  };

  getTaskById = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        const error = new Error("Invalid task ID");
        error.statusCode = 400;
        throw error;
      }

      const task = await this.service.getTaskById(id);
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  };

  createTask = async (req, res, next) => {
    try {
      const newTask = await this.service.createTask(req.body);
      res.status(201).json(newTask);
    } catch (err) {
      next(err);
    }
  };

  updateTask = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        const error = new Error("Invalid task ID");
        error.statusCode = 400;
        throw error;
      }

      const updatedTask = await this.service.updateTask(id, req.body);
      res.status(200).json(updatedTask);
    } catch (err) {
      next(err);
    }
  };

  deleteTask = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        const error = new Error("Invalid task ID");
        error.statusCode = 400;
        throw error;
      }

      await this.service.deleteTask(id);
      res.status(200).json({ message: "Task deleted successfully." });
    } catch (err) {
      next(err);
    }
  };
}

export default new TaskController(taskService);
