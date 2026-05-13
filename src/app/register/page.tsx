"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { TEAM_OPTIONS, WORK_OPTIONS } from "@/src/lib/constants";

type FormType = {
  fullName: string;
  email: string;
  password: string;
  siteName: string;
  workType: string;
  teamGoals: string[];
};

export default function OrbitRegister() {
  const [form, setForm] = useState<FormType>({
    fullName: "",
    email: "",
    password: "",
    siteName: "orbit-workspace",
    workType: "",
    teamGoals: [],
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const update = (data: Partial<FormType>) =>
    setForm((f) => ({ ...f, ...data }));

  const toggleGoal = (goal: string) => {
    const exists = form.teamGoals.includes(goal);
    update({
      teamGoals: exists
        ? form.teamGoals.filter((g) => g !== goal)
        : [...form.teamGoals, goal],
    });
  };

  const submit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/register", {
        ...form,
        work: form.workType ? [form.workType] : [],
      });
      if (res.status === 201 || res.status === 200) router.push("/dashboard");
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl p-10 shadow-sm"
      >
        <header className="mb-10 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Set up your workspace in one step
          </p>
        </header>

        <div className="space-y-8">
          {/* SECTION: Account Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Account
            </h3>
            <input
              className="w-full border-b border-gray-200 py-2 outline-none focus:border-black transition text-sm"
              placeholder="Full Name"
              onChange={(e) => update({ fullName: e.target.value })}
            />
            <input
              className="w-full border-b border-gray-200 py-2 outline-none focus:border-black transition text-sm"
              placeholder="Email address"
              onChange={(e) => update({ email: e.target.value })}
            />
            <input
              type="password"
              className="w-full border-b border-gray-200 py-2 outline-none focus:border-black transition text-sm"
              placeholder="Password"
              onChange={(e) => update({ password: e.target.value })}
            />
          </div>

          {/* SECTION: Workspace */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Workspace
            </h3>
            <div className="flex items-center border-b border-gray-200">
              <input
                value={form.siteName}
                onChange={(e) => update({ siteName: e.target.value })}
                className="flex-1 py-2 outline-none text-sm"
                placeholder="Site name"
              />
              <span className="text-gray-400 text-sm">.orbit.app</span>
            </div>
          </div>

          {/* SECTION: Focus */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Your Focus
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {WORK_OPTIONS.slice(0, 4).map((w) => (
                <button
                  key={w.label}
                  onClick={() => update({ workType: w.label })}
                  className={`text-left p-3 border rounded-lg transition text-xs flex items-center gap-2 ${
                    form.workType === w.label
                      ? "border-black bg-gray-50"
                      : "border-gray-100"
                  }`}
                >
                  <span>{w.icon}</span> {w.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-900 transition disabled:opacity-50 mt-4"
          >
            {loading ? "Creating..." : "Complete Setup"}
          </button>

          <p
            className="text-center text-xs text-gray-400 cursor-pointer hover:text-black transition"
            onClick={() => router.push("/login")}
          >
            Already have an account? Sign in
          </p>
        </div>
      </motion.div>
    </div>
  );
}
