import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    site: { type: String },
    work: { type: String },
    team: { type: String },
    space: { type: String },
})

export const userModel = mongoose.model("user", userSchema);
