"use client";

import axios from "axios";
import React, { useState } from "react";

const WORK_OPTIONS = [
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
];

const TEAM_OPTIONS = [
  "track work",
  "manage tasks",
  "works in scrum",
  "run sprints",
  "prioritize work",
  "map work dependencies",
];

const RegisterPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    site: "",
    work: [] as string[],
    team: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleCheckbox = (field: "work" | "team", value: string) => {
    setForm((prev) => {
      const exists = prev[field].includes(value);

      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((v) => v !== value)
          : [...prev[field], value],
      };
    });
  };

  const handleSubmit = async () => {
    try {
      console.log(form);

      const res = await axios.post("/api/auth/register", form);

      console.log(res.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-xl">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Create Account
        </h1>

        {/* BASIC FIELDS */}
        <input
          name="fullName"
          placeholder="Full Name"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="site"
          placeholder="Website (optional)"
          className="w-full border p-2 mb-5 rounded"
          onChange={handleChange}
        />

        {/* WORK */}
        <h2 className="font-medium mb-2">Work</h2>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {WORK_OPTIONS.map((w) => (
            <label key={w} className="text-sm flex gap-2">
              <input
                type="checkbox"
                checked={form.work.includes(w)}
                onChange={() => toggleCheckbox("work", w)}
              />
              {w}
            </label>
          ))}
        </div>

        {/* TEAM */}
        <h2 className="font-medium mb-2">Team Style</h2>
        <div className="grid grid-cols-1 gap-2 mb-6">
          {TEAM_OPTIONS.map((t) => (
            <label key={t} className="text-sm flex gap-2">
              <input
                type="checkbox"
                checked={form.team.includes(t)}
                onChange={() => toggleCheckbox("team", t)}
              />
              {t}
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
