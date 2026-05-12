"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const login = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/login", form);
      if (res.status === 200) router.push("/profile");
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl p-10 shadow-sm"
      >
        <header className="mb-10 text-center">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-black rounded-xl mx-auto mb-4 flex items-center justify-center shadow-sm">
            <div className="w-4 h-4 bg-white rounded-full opacity-20" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to your Orbit workspace
          </p>
        </header>

        <div className="space-y-8">
          {/* Form Fields */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Credentials
            </h3>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition text-sm bg-transparent"
                placeholder="name@company.com"
                onChange={(e) => update("email", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition text-sm bg-transparent"
                placeholder="••••••••"
                onChange={(e) => update("password", e.target.value)}
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="space-y-4">
            <button
              onClick={login}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-900 transition shadow-sm disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Continue to Orbit"}
            </button>

            <div className="flex flex-col gap-3 items-center">
              <p
                className="text-xs text-gray-400 cursor-pointer hover:text-black transition"
                onClick={() => router.push("/register")}
              >
                Don't have an account?{" "}
                <span className="text-gray-900 font-medium">Create one</span>
              </p>

              <p className="text-[10px] text-gray-300">
                Forgot your password? Reset it here.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
