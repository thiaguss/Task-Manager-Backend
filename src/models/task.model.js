import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const TaskModel = model("Task", TaskSchema);

export default TaskModel;