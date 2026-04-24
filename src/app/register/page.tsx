"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Check, Search, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const WORK_OPTIONS = [
  { label: "software development", icon: "💻" },
  { label: "marketing", icon: "📢" },
  { label: "project management", icon: "📅" },
  { label: "it support", icon: "🎧" },
  { label: "customer service", icon: "🌍" },
  { label: "finance", icon: "📊" },
  { label: "data science", icon: "📉" },
  { label: "design", icon: "🎨" },
  { label: "operations", icon: "⚙️" },
  { label: "human resources", icon: "👔" },
  { label: "legal", icon: "🏛️" },
  { label: "sales", icon: "💼" },
  { label: "other", icon: "✨" },
];

const TEAM_OPTIONS = [
  "track work",
  "manage tasks",
  "works in scrum",
  "run sprints",
  "prioritize work",
  "map work dependencies",
];

const steps = ["Email", "Account", "Workspace", "Work", "Team"];

type FormType = {
  fullName: string;
  email: string;
  password: string;
  siteName: string;
  workType: string;
  teamGoals: string[];
};

export default function OrbitRegister() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormType>({
    fullName: "",
    email: "",
    password: "",
    siteName: "orbit-workspace",
    workType: "",
    teamGoals: [],
  });
  
  const router = useRouter();
  const next = () => setStep((s) => Math.min(s + 1, 5));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

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
    try {
      const res = await axios.post("/api/users", {
        ...form,
        work: form.workType ? [form.workType] : [],
      });

      if (res.status === 201 || res.status === 200) {
        router.push("/profile");
      }
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data);
      alert("Something went wrong. Try again.");
    }
  };

  const variants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.98 },
  };

  return (
    <div className="relative min-h-screen bg-[#f4f5f7] overflow-hidden">
      {/* JIRA STYLE BACKGROUND */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="h-12 bg-white border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-blue-600 rounded-sm" />
            <div className="w-24 h-3 bg-gray-300 rounded" />
            <div className="w-16 h-3 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center gap-3">
            <Search size={16} className="text-gray-400" />
            <Bell size={16} className="text-gray-400" />
            <div className="w-6 h-6 bg-gray-300 rounded-full" />
          </div>
        </div>

        <div className="flex h-[calc(100vh-48px)]">
          <div className="w-64 bg-white border-r p-4 space-y-4">
            <div className="h-8 bg-gray-200 rounded" />
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-3 bg-gray-200 rounded" />
            ))}
          </div>

          <div className="flex-1 p-6 grid grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="w-24 h-4 bg-gray-300 rounded" />
                <div className="h-40 bg-white border rounded" />
                <div className="h-32 bg-white border rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 backdrop-blur-sm">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8 border border-gray-200">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            {steps.map((_, i) => (
              <div key={i} className="flex-1 flex items-center gap-2">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${step >= i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-200" />
                )}
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mb-6">Step {step} of 5</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              {step === 1 && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-semibold text-gray-800">
                    Start your journey
                  </h1>
                  <input
                    className="input"
                    placeholder="Email"
                    onChange={(e) => update({ email: e.target.value })}
                  />
                  <button onClick={next} className="btn-primary w-full">
                    Continue
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-semibold text-gray-800">
                    Create account
                  </h1>
                  <input
                    className="input"
                    placeholder="Full name"
                    onChange={(e) => update({ fullName: e.target.value })}
                  />
                  <div className="relative">
                    <input
                      type="password"
                      className="input"
                      placeholder="Password"
                      onChange={(e) => update({ password: e.target.value })}
                    />
                    <Eye className="absolute right-4 top-3 text-gray-400" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={prev} className="btn-secondary">
                      Back
                    </button>
                    <button onClick={next} className="btn-primary">
                      Next
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-semibold text-gray-800">
                    Workspace
                  </h1>
                  <div className="flex">
                    <input
                      value={form.siteName}
                      onChange={(e) => update({ siteName: e.target.value })}
                      className="flex-1 input rounded-r-none"
                    />
                    <div className="bg-gray-100 px-4 flex items-center rounded-r-xl text-sm text-gray-500 border border-l-0">
                      .orbit.app <Check className="ml-2 text-green-500" />
                    </div>
                  </div>
                  <button onClick={next} className="btn-primary w-full">
                    Continue
                  </button>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-semibold text-gray-800">
                    Your work
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {WORK_OPTIONS.map((w) => (
                      <button
                        key={w.label}
                        onClick={() => {
                          update({ workType: w.label });
                          next();
                        }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all
                        ${
                          form.workType === w.label
                            ? "border-blue-500 bg-blue-50 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                        }`}
                      >
                        <span className="text-2xl">{w.icon}</span>
                        <span className="text-xs font-medium text-gray-700 text-center">
                          {w.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-semibold text-gray-800">
                    Team goals
                  </h1>
                  <div className="grid grid-cols-2 gap-3">
                    {TEAM_OPTIONS.map((g) => (
                      <label
                        key={g}
                        className={`flex gap-2 p-3 border rounded-lg cursor-pointer transition
                        ${
                          form.teamGoals.includes(g)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input type="checkbox" onChange={() => toggleGoal(g)} />
                        <span className="text-sm text-gray-700">{g}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={prev} className="btn-secondary">
                      Back
                    </button>
                    <button onClick={submit} className="btn-primary">
                      Finish
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          background: white;
          border: 1px solid #e5e7eb;
          padding: 12px 16px;
          border-radius: 10px;
          outline: none;
          font-size: 14px;
        }
        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
        }
        .btn-primary {
          background: #2563eb;
          color: white;
          padding: 10px 16px;
          border-radius: 10px;
          font-weight: 500;
        }
        .btn-primary:hover {
          background: #1d4ed8;
        }
        .btn-secondary {
          background: #f3f4f6;
          padding: 10px 16px;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
