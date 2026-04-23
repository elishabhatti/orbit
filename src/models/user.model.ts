import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true },
  password: String,
  site: String,

  work: [
    {
      type: String,
      enum: [
        "software development",
        "marketing",
        "project management",
        "it support",
        "customer service",
        "finance",
        "data science",
        "design",
        "operations",
        "human resources",
        "legal",
        "sales",
        "other",
      ],
    },
  ],

  team: [
    {
      type: String,
      enum: [
        "track work",
        "manage tasks",
        "works in scrum",
        "run sprints",
        "prioritize work",
        "map work dependencies",
      ],
    },
  ],
});

export const userModel =
  mongoose.models.user || mongoose.model("user", userSchema);
