"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Types
interface Workspace {
  _id: string;
  name: string;
  description: string;
}

interface User {
  fullName: string;
  email: string;
}

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Logic
  useEffect(() => {
    const loadData = async () => {
      try {
        const [userRes, workspaceRes] = await Promise.all([
          axios.get("/api/auth/me"),
          axios.get("/api/workspace/my-workspaces"),
        ]);
        setUser(userRes.data);
        setWorkspaces(workspaceRes.data.workspaces);
      } catch (err) {
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [router]);

  const createWorkspace = async () => {
    if (!name.trim()) return;
    try {
      const res = await axios.post("/api/workspace/create", { name });
      setWorkspaces((prev) => [res.data.workspace, ...prev]);
      setName("");
    } catch (error) {
      console.log("Create Error:", error);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-xs uppercase tracking-widest text-gray-400">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111] p-6 md:p-12 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* 1. USER INFO SECTION */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user?.fullName?.[0]}
            </div>
            <div>
              <h1 className="text-sm font-bold uppercase tracking-tight">
                {user?.fullName}
              </h1>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() =>
              axios.post("/api/auth/logout").then(() => router.push("/login"))
            }
            className="text-[11px] font-bold uppercase tracking-wider border border-gray-200 px-4 py-2 rounded hover:bg-gray-50 transition"
          >
            Logout
          </button>
        </header>

        {/* 2. CREATE WORKSPACE BUTTON / INPUT */}
        <section className="mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-1 flex gap-2">
            <input
              type="text"
              placeholder="Workspace name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-2 text-sm focus:outline-none bg-transparent"
            />
            <button
              onClick={createWorkspace}
              className="bg-black text-white text-[11px] font-bold uppercase tracking-widest px-6 py-2 rounded-lg hover:bg-zinc-800 transition"
            >
              Create
            </button>
          </div>
        </section>

        {/* 3. WORKSPACE LIST */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-2">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              Your Workspaces
            </h2>
            <span className="text-[10px] font-mono text-gray-300">
              {workspaces.length} Total
            </span>
          </div>

          <div className="grid gap-3">
            {workspaces.map((ws) => (
              <div
                key={ws._id}
                className="group flex items-center justify-between bg-white border border-gray-200 p-5 rounded-xl hover:border-black transition-all cursor-default"
              >
                {/* Workspace Name */}
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900">
                    {ws.name}
                  </span>
                  <span className="text-[11px] text-gray-400 mt-0.5 font-mono">
                    ID: {ws._id.slice(-6)}
                  </span>
                </div>

                {/* Open Workspace Button */}
                <button
                  onClick={() => router.push(`/workspace/${ws._id}`)}
                  className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-tighter bg-gray-50 px-4 py-2 rounded-md group-hover:bg-black group-hover:text-white transition-colors"
                >
                  Open
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}

            {workspaces.length === 0 && (
              <div className="text-center py-20 border border-dashed border-gray-200 rounded-2xl">
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  No workspaces found
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
