"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

// --- Types ---
interface Workspace {
  _id: string;
  name: string;
  description?: string;
}

interface Project {
  _id: string;
  name: string;
  key: string;
  status: "active" | "archived";
}

const WorkspaceDetails = () => {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.id as string;

  // Data States
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", key: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!workspaceId) return;
    fetchData();
  }, [workspaceId]);

  const fetchData = async () => {
    try {
      const [wsRes, projRes] = await Promise.all([
        axios.get(`/api/workspace/${workspaceId}`),
        axios.get(`/api/project/workspace/${workspaceId}`),
      ]);
      setWorkspace(wsRes.data.workspace);
      setProjects(projRes.data.projects);
    } catch (err) {
      console.error("Failed to load:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Create Project Logic ---
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("/api/project/create", {
        name: newProject.name,
        key: newProject.key.toUpperCase(),
        workspaceId: workspaceId, // Link project to THIS workspace
      });

      // Reset & Refresh
      setNewProject({ name: "", key: "" });
      setIsModalOpen(false);
      fetchData(); // List update karne ke liye dobara fetch
    } catch (err) {
      alert("Error creating project");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-xs uppercase tracking-widest text-gray-400 animate-pulse">
        Syncing...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-12 text-[#111]">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] text-gray-400 mb-10 uppercase tracking-widest font-bold">
          <button
            onClick={() => router.push("/dashboard")}
            className="hover:text-black"
          >
            Dashboards
          </button>
          <span>/</span>
          <span className="text-black">{workspace?.name}</span>
        </nav>

        {/* Header */}
        <div className="flex justify-between items-end mb-16 gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">
              {workspace?.name}
            </h1>
            <p className="text-gray-500 text-sm max-w-md">
              {workspace?.description}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)} // Open Modal here
            className="bg-black text-white px-8 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition shadow-sm"
          >
            Create Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((proj) => (
            <div
              key={proj._id}
              onClick={() => router.push(`/project/${proj._id}`)}
              className="group bg-white border border-gray-200 p-7 rounded-2xl hover:border-black cursor-pointer transition-all"
            >
              <div className="bg-zinc-100 group-hover:bg-black group-hover:text-white w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs transition-colors mb-6">
                {proj.key}
              </div>
              <h3 className="font-bold text-base mb-1">{proj.name}</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                Open Board →
              </p>
            </div>
          ))}
        </div>

        {/* --- Minimalist Modal --- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-black tracking-tighter mb-6">
                New Project
              </h2>

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">
                    Project Name
                  </label>
                  <input
                    required
                    value={newProject.name}
                    onChange={(e) =>
                      setNewProject({ ...newProject, name: e.target.value })
                    }
                    placeholder="e.g. Mobile App"
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-black outline-none transition text-sm"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">
                    Project Key (3-4 Letters)
                  </label>
                  <input
                    required
                    maxLength={4}
                    value={newProject.key}
                    onChange={(e) =>
                      setNewProject({ ...newProject, key: e.target.value })
                    }
                    placeholder="e.g. MOB"
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-black outline-none transition text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-black text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition disabled:bg-gray-400"
                  >
                    {isSubmitting ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceDetails;
