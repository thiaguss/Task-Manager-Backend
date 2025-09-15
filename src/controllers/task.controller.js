import TaskModel from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "This task was not found." });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updatedTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const taskToUpdate = await TaskModel.findById(taskId);

    const allowedUpdates = ["isCompleted"];
    const requestedUpdates = Object.keys(req.body);

    for (update of requestedUpdates) {
      if (allowedUpdates.includes(update)) {
        taskToUpdate[update] = req.body[update]
      } else {
        res.status(500).json("One or more inserted fields are not editable.")
      }
    }

    await taskToUpdate.save();

    res.status(200).json(taskToUpdate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletedTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const deletedTask = await TaskModel.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
