import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    site: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

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
  },
  {
    timestamps: true,
  }
);

export const userModel =
  mongoose.models.user || mongoose.model("user", userSchema);