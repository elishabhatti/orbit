"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

// --- Types & Interfaces ---
interface Workspace {
  _id: string;
  name: string;
  description?: string;
  owner: string;
}

interface Project {
  _id: string;
  name: string;
  key: string;
  workspace: string;
  status: "active" | "archived";
}

const WorkspaceDetails = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // States with Types
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchWorkspaceData = async () => {
      try {
        const [wsRes, projRes] = await Promise.all([
          axios.get<{ success: boolean; workspace: Workspace }>(
            `/api/workspace/${id}`,
          ),
          axios.get<{ success: boolean; projects: Project[] }>(
            `/api/project/workspace/${id}`,
          ),
        ]);

        setWorkspace(wsRes.data.workspace);
        setProjects(projRes.data.projects);
      } catch (err) {
        console.error("Failed to load workspace data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaceData();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 animate-pulse">
          Syncing Workspace...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-12 text-[#111]">
      <div className="max-w-5xl mx-auto">
        {/* Workspace Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] text-gray-400 mb-10 uppercase tracking-widest font-bold">
          <button
            onClick={() => router.push("/dashboard")}
            className="hover:text-black transition"
          >
            Dashboards
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-black">{workspace?.name}</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">
              {workspace?.name}
            </h1>
            <p className="text-gray-500 text-sm max-w-md leading-relaxed">
              {workspace?.description ||
                "Manage your projects and team collaboration here."}
            </p>
          </div>

          <button className="bg-black text-white px-8 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition shadow-sm">
            Create Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.length > 0 ? (
            projects.map((proj) => (
              <div
                key={proj._id}
                onClick={() => router.push(`/project/${proj._id}`)}
                className="group bg-white border border-gray-200 p-7 rounded-2xl hover:border-black cursor-pointer transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-zinc-100 group-hover:bg-black group-hover:text-white w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs transition-colors">
                    {proj.key}
                  </div>
                  <div
                    className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
                      proj.status === "active"
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {proj.status}
                  </div>
                </div>

                <h3 className="font-bold text-base mb-1 group-hover:underline underline-offset-4">
                  {proj.name}
                </h3>
                <p className="text-xs text-gray-400">View tasks and progress</p>

                <div className="mt-8 pt-5 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-mono">
                    ID: {proj._id.slice(-6).toUpperCase()}
                  </span>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-200 border-2 border-white" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 border border-dashed border-gray-200 rounded-3xl text-center">
              <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-bold mb-4">
                No projects found
              </p>
              <button className="text-[11px] font-bold border-b-2 border-black pb-1 hover:text-gray-600 transition">
                Create your first project
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceDetails;
