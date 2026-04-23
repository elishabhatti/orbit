"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Check, Search, Bell, HelpCircle } from "lucide-react";
import axios from "axios";

const WORK_OPTIONS = [
  { label: "Software development", icon: "💻" },
  { label: "Product management", icon: "⚙️" },
  { label: "Marketing", icon: "📢" },
  { label: "Design", icon: "🎨" },
  { label: "Project management", icon: "📅" },
  { label: "Operations", icon: "⚙️" },
  { label: "IT support", icon: "🎧" },
  { label: "Human resources", icon: "👔" },
  { label: "Customer service", icon: "🌍" },
  { label: "Legal", icon: "🏛️" },
  { label: "Finance", icon: "📊" },
  { label: "Sales", icon: "💼" },
  { label: "Data science", icon: "📉" },
  { label: "Other", icon: "✨" },
];

const TEAM_OPTIONS = [
  "Track bugs", "Run sprints", "Manage tasks", 
  "Prioritize work", "Work in scrum", "Map work dependencies"
];

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    siteName: "elishacode2007",
    workType: "",
    teamGoals: [] as string[],
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleUpdate = (fields: Partial<typeof form>) => {
    setForm(prev => ({ ...prev, ...fields }));
  };

  const toggleGoal = (goal: string) => {
    const exists = form.teamGoals.includes(goal);
    handleUpdate({
      teamGoals: exists 
        ? form.teamGoals.filter(g => g !== goal) 
        : [...form.teamGoals, goal]
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/auth/register", form);
      console.log("Success:", res.data);
      alert("Account created successfully!");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f4f5f7] font-sans overflow-hidden">
      
      {/* JIRA PROFESSIONAL SKELETON BACKGROUND */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        {/* Top Nav */}
        <div className="h-12 border-b border-gray-300 flex items-center px-4 justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-6 h-6 bg-blue-600 rounded-sm" />
            <div className="w-20 h-3 bg-gray-300 rounded" />
            <div className="w-16 h-3 bg-gray-200 rounded" />
          </div>
          <div className="flex gap-3 items-center">
             <Search size={16} className="text-gray-400" />
             <Bell size={16} className="text-gray-400" />
             <div className="w-6 h-6 bg-gray-300 rounded-full" />
          </div>
        </div>
        <div className="flex h-[calc(100vh-48px)]">
          {/* Sidebar */}
          <div className="w-60 border-r border-gray-300 p-4 space-y-4">
             <div className="w-full h-8 bg-gray-200 rounded-md" />
             <div className="space-y-2 pt-4">
               {[...Array(8)].map((_, i) => <div key={i} className="h-3 bg-gray-200 rounded w-full" />)}
             </div>
          </div>
          {/* Board Content */}
          <div className="flex-1 p-8 grid grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="w-24 h-4 bg-gray-300 rounded" />
                <div className="h-40 bg-white border border-gray-200 rounded p-3" />
                <div className="h-32 bg-white border border-gray-200 rounded p-3" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL CONTAINER */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full ${step >= 4 ? 'max-w-[720px]' : 'max-w-[520px]'} bg-white rounded-[3px] border border-[#dfe1e6] p-10 transition-all duration-500`}>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div className="text-center">
                  <h1 className="text-[24px] font-semibold text-[#172b4d] mb-2 relative inline-block">
                    Get started with Jira
                    <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 0 100 5" stroke="#ff8b00" strokeWidth="2" fill="transparent" />
                    </svg>
                  </h1>
                  <p className="text-[#6b778c] text-[14px] mb-8">It's free for up to 10 users.</p>
                  <div className="text-left space-y-4">
                    <label className="text-[12px] font-bold text-[#6b778c] uppercase block">Work email</label>
                    <div className="flex gap-2">
                      <input type="email" value={form.email} onChange={(e) => handleUpdate({ email: e.target.value })} placeholder="you@company.com" className="flex-1 border-2 border-[#dfe1e6] rounded-[3px] px-3 py-2 outline-none focus:border-[#4c9aff]" />
                      <button onClick={nextStep} className="bg-[#0052cc] text-white px-6 py-2 rounded-[3px] font-medium hover:bg-[#0747a6]">Sign up</button>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="text-center">
                  <h1 className="text-[24px] font-semibold text-[#172b4d] mb-1 relative inline-block">
                    Add your account details
                    <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 0 100 5" stroke="#ff8b00" strokeWidth="2" fill="transparent" />
                    </svg>
                  </h1>
                  <p className="text-[#6b778c] text-[13px] mb-6">Signing up as <span className="text-blue-600 font-medium">{form.email}</span></p>
                  <div className="space-y-5 text-left">
                    <div>
                      <label className="text-[12px] font-bold text-[#6b778c] uppercase mb-1 block">Full name</label>
                      <input value={form.fullName} onChange={(e) => handleUpdate({ fullName: e.target.value })} className="w-full border-2 border-[#dfe1e6] rounded-[20px] px-4 py-2 outline-none focus:border-[#4c9aff]" />
                    </div>
                    <div>
                      <label className="text-[12px] font-bold text-[#6b778c] uppercase mb-1 block">Password</label>
                      <div className="relative">
                        <input type="password" onChange={(e) => handleUpdate({ password: e.target.value })} className="w-full border-2 border-[#dfe1e6] rounded-[20px] px-4 py-2 outline-none focus:border-[#4c9aff]" />
                        <Eye className="absolute right-4 top-2.5 text-gray-400 w-5 h-5" />
                      </div>
                    </div>
                    <button onClick={nextStep} className="w-full bg-[#0052cc] text-white py-3 rounded-[20px] font-bold hover:bg-[#0747a6]">Continue</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center">
                  <h1 className="text-[24px] font-semibold text-[#172b4d] mb-1">Create a site</h1>
                  <p className="text-[#6b778c] text-[13px] mb-8">Where your team organizes work and projects.</p>
                  <div className="text-left mb-8">
                    <label className="text-[12px] font-bold text-[#6b778c] uppercase mb-1 block">Your site</label>
                    <div className="flex border-2 border-[#dfe1e6] rounded-[3px] overflow-hidden focus-within:border-[#4c9aff]">
                      <input className="flex-1 px-3 py-2 outline-none text-[#172b4d]" value={form.siteName} onChange={(e) => handleUpdate({ siteName: e.target.value })} />
                      <span className="bg-[#f4f5f7] px-3 py-2 text-[#6b778c] border-l border-[#dfe1e6] text-sm flex items-center">.atlassian.net <Check className="ml-2 w-4 h-4 text-green-600" /></span>
                    </div>
                  </div>
                  <button onClick={nextStep} className="w-full bg-[#0052cc] text-white py-3 rounded-[3px] font-bold hover:bg-[#0747a6]">Continue</button>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h1 className="text-[24px] font-semibold text-[#172b4d] text-center mb-1">What kind of work do you do?</h1>
                  <p className="text-[#6b778c] text-[13px] text-center mb-8">This helps us suggest professional templates.</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                    {WORK_OPTIONS.map((opt) => (
                      <button 
                        key={opt.label} 
                        onClick={() => { handleUpdate({ workType: opt.label }); nextStep(); }} 
                        className={`flex flex-col items-center gap-2 border p-4 rounded-[3px] transition-all text-center ${form.workType === opt.label ? "border-[#0052cc] bg-blue-50" : "border-[#dfe1e6] hover:bg-[#f4f5f7]"}`}
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <span className="text-[#42526e] text-[12px] font-semibold">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h1 className="text-[24px] font-semibold text-[#172b4d] text-center mb-8">How does your team plan to use Jira?</h1>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {TEAM_OPTIONS.map((opt) => (
                      <label 
                        key={opt} 
                        className={`flex items-center gap-3 border p-4 rounded-[3px] cursor-pointer transition-all ${form.teamGoals.includes(opt) ? "border-[#0052cc] bg-blue-50" : "border-[#dfe1e6] hover:border-blue-500"}`}
                      >
                        <input 
                          type="checkbox" 
                          checked={form.teamGoals.includes(opt)}
                          onChange={() => toggleGoal(opt)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600" 
                        />
                        <span className="text-[#42526e] text-sm font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex justify-center gap-4">
                     <button onClick={prevStep} className="text-[#42526e] font-medium px-4 py-2 hover:bg-gray-100 rounded">Back</button>
                     <button onClick={handleSubmit} className="bg-[#0052cc] text-white px-8 py-2 rounded-[3px] font-medium hover:bg-[#0747a6]">Finish Setup</button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;