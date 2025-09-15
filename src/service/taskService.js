import TaskModel from "../models/task.model.js";

export const getAllTasks = async () => {
  return await TaskModel.find({});
};

export const getTaskById = async (id) => {
  const task = await TaskModel.findById(id);
  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  return task;
};

export const createTask = async (data) => {
  try {
    const newTask = new TaskModel(data);
    return await newTask.save();
  } catch (err) {
    const error = new Error("Failed to create task");
    error.statusCode = 400;
    throw error;
  }
};

export const updateTask = async (id, updates) => {
  const allowedUpdates = ["isCompleted"];
  const requestedUpdates = Object.keys(updates);

  const isValidOperation = requestedUpdates.every((field) =>
    allowedUpdates.includes(field)
  );

  if (!isValidOperation) {
    const error = new Error("One or more fields are not editable");
    error.statusCode = 400;
    throw error;
  }

  const task = await TaskModel.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};

export const deleteTask = async (id) => {
  const deletedTask = await TaskModel.findByIdAndDelete(id);
  if (!deletedTask) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  return deletedTask;
};
