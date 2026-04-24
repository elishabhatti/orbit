"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const login = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/login", form);

      if (res.status === 200) {
        router.push("/profile");
      }
    } catch (err) {
      console.log(err);
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* SUBTLE JIRA BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[radial-gradient(#dfe1e6_1px,transparent_1px)] [background-size:18px_18px] opacity-50" />

      {/* TOP BAR (JIRA FEEL) */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-white border-b flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-blue-600 rounded-md" />
          <span className="text-sm font-semibold text-gray-700">
            Orbit
          </span>
        </div>

        <div className="text-xs text-gray-400">
          Secure Login
        </div>
      </div>

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-xl p-8"
      >

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Log in to your account
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Welcome back. Continue to your workspace.
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="you@company.com"
            onChange={(e) => update("email", e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="text-xs font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="••••••••"
            onChange={(e) => update("password", e.target.value)}
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* FOOTER LINKS */}
        <div className="mt-5 flex justify-between text-xs text-gray-500">
          <span
            onClick={() => router.push("/register")}
            className="hover:text-blue-600 cursor-pointer"
          >
            Create account
          </span>

          <span className="hover:text-blue-600 cursor-pointer">
            Forgot password?
          </span>
        </div>
      </motion.div>
    </div>
  );
}