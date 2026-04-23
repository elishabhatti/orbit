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
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      console.log("SUBMIT:", form);

      const res = await axios.post("/api/users", form);

      console.log(res.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* HEADER */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Build your workspace profile in minutes
          </p>
        </div>

        {/* FORM */}
        <div className="p-6 space-y-4">

          {/* BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="site"
              value={form.site}
              onChange={handleChange}
              placeholder="Website (optional)"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* WORK SECTION */}
          <div>
            <h2 className="font-semibold text-gray-700 mt-4 mb-2">
              What do you do?
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {WORK_OPTIONS.map((w) => (
                <button
                  type="button"
                  key={w}
                  onClick={() => toggleCheckbox("work", w)}
                  className={`text-xs p-2 rounded-lg border transition ${
                    form.work.includes(w)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* TEAM SECTION */}
          <div>
            <h2 className="font-semibold text-gray-700 mt-4 mb-2">
              How do you work?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {TEAM_OPTIONS.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => toggleCheckbox("team", t)}
                  className={`text-xs p-2 rounded-lg border transition text-left ${
                    form.team.includes(t)
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Create Account
          </button>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;