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
      const res = await axios.post("/api/register", {
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
    <div className="relative min-h-screen overflow-hidden">
      {/* SOFT GRID BACKGROUND (CLEAN JIRA FEEL) */}
      <div className="absolute inset-0 bg-[radial-gradient(#dfe1e6_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

      {/* TOP BAR */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-white border-b flex items-center justify-between px-5 z-0">
        <div className="flex items-center gap-4">
          <div className="w-7 h-7 bg-blue-600 rounded-md shadow-sm" />
          <div className="w-28 h-3 bg-gray-200 rounded" />
        </div>

        <div className="flex items-center gap-3">
          <Search size={16} className="text-gray-400" />
          <Bell size={16} className="text-gray-400" />
          <div className="w-7 h-7 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* FORM */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-16">
        <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8">
          {/* PROGRESS */}
          <div className="flex mb-6">
            {steps.map((_, i) => (
              <div key={i} className="flex-1 flex items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition ${
                    step >= i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i + 1}
                </div>
                {i !== steps.length - 1 && (
                  <div className="flex-1 h-[2px] bg-gray-200 mx-2" />
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mb-6">
            Step {step} of {steps.length}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.22 }}
            >
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-5">
                  <h1 className="text-2xl font-semibold text-gray-900">
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

                  <button
                    onClick={() => router.push("/login")}
                    className="text-sm text-blue-600 hover:underline w-full text-center"
                  >
                    Already have an account? Login
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-5">
                  <h1 className="text-2xl font-semibold text-gray-900">
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
                    <Eye className="absolute right-4 top-3 text-gray-400 w-4 h-4" />
                  </div>

                  <div className="flex gap-3">
                    <button onClick={prev} className="btn-secondary w-full">
                      Back
                    </button>
                    <button onClick={next} className="btn-primary w-full">
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-5">
                  <h1 className="text-2xl font-semibold">Workspace</h1>

                  <div className="flex">
                    <input
                      value={form.siteName}
                      onChange={(e) => update({ siteName: e.target.value })}
                      className="input rounded-r-none"
                    />
                    <div className="px-3 flex items-center bg-gray-100 border border-l-0 rounded-r-lg text-sm text-gray-500">
                      .orbit.app{" "}
                      <Check className="ml-1 w-4 h-4 text-green-500" />
                    </div>
                  </div>

                  <button onClick={next} className="btn-primary w-full">
                    Continue
                  </button>
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="space-y-5">
                  <h1 className="text-2xl font-semibold">Your work</h1>

                  <div className="grid grid-cols-2 gap-3">
                    {WORK_OPTIONS.map((w) => (
                      <button
                        key={w.label}
                        onClick={() => {
                          update({ workType: w.label });
                          next();
                        }}
                        className="border rounded-xl p-4 hover:shadow-sm hover:border-blue-400 transition"
                      >
                        <div className="text-2xl">{w.icon}</div>
                        <div className="text-xs mt-1 text-gray-700">
                          {w.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <div className="space-y-5">
                  <h1 className="text-2xl font-semibold">Team goals</h1>

                  <div className="grid grid-cols-2 gap-3">
                    {TEAM_OPTIONS.map((g) => (
                      <label
                        key={g}
                        className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer"
                      >
                        <input type="checkbox" onChange={() => toggleGoal(g)} />
                        <span className="text-sm">{g}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={prev} className="btn-secondary w-full">
                      Back
                    </button>
                    <button onClick={submit} className="btn-primary w-full">
                      Finish
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          padding: 12px 14px;
          border-radius: 10px;
          outline: none;
          background: white;
        }
        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
        }
        .btn-primary {
          background: #2563eb;
          color: white;
          padding: 10px 14px;
          border-radius: 10px;
        }
        .btn-primary:hover {
          background: #1e40af;
        }
        .btn-secondary {
          background: #f3f4f6;
          border-radius: 10px;
          padding: 10px 14px;
        }
      `}</style>
    </div>
  );
}
