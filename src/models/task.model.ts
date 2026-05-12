import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true,
    },

    sprint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sprint",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["todo", "in progress", "review", "done"],
      default: "todo",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    dueDate: Date,

    labels: [String],
  },
  {
    timestamps: true,
  }
);

export const taskModel =
  mongoose.models.task ||
  mongoose.model("task", taskSchema);