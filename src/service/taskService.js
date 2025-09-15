import TaskModel from "../models/task.model.js";

export const getAllTasks = async () => {
  return await TaskModel.find({});
};

export const getTaskById = async (id) => {
  return await TaskModel.findById(id);
};

export const createTask = async (data) => {
  const newTask = new TaskModel(data);
  return await newTask.save();
};

export const updateTask = async (id, updates) => {
  const allowedUpdates = ["isCompleted"];
  const requestedUpdates = Object.keys(updates);

  const isValidOperation = requestedUpdates.every((field) =>
    allowedUpdates.includes(field)
  );

  if (!isValidOperation) {
    throw new Error("One or more fields are not editable.");
  }

  return await TaskModel.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
};

export const deleteTask = async (id) => {
  return await TaskModel.findByIdAndDelete(id);
};
