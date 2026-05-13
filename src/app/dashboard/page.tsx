"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/me");
      setUser(res.data);
    } catch {
      router.push("/login");
    }
  };

  const fetchWorkspaces = async () => {
    try {
      const res = await axios.get("/api/workspace/my-workspaces");
      setWorkspaces(res.data.workspaces);
    } catch (error) {
      console.log(error);
    }
  };

  const createWorkspace = async () => {
    try {
      if (!name) return;
      const res = await axios.post("/api/workspace/create", {
        name,
        description,
      });
      setWorkspaces((prev) => [res.data.workspace, ...prev]);
      setName("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await axios.post("/api/logout");
    router.push("/login");
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchUser();
      await fetchWorkspaces();
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-sm text-gray-500 font-medium">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen p-6 md:p-12 text-[#111]">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.fullName?.[0]}
            </div>
            <div>
              <h1 className="text-base font-semibold leading-none">
                {user?.fullName}
              </h1>
              <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="text-xs font-medium border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-50 transition"
          >
            Sign out
          </button>
        </div>

        {/* Create Workspace Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10">
          <h2 className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-4">
            New Workspace
          </h2>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Workspace name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-black transition"
            />

            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-black transition min-h-[80px] resize-none"
            />

            <button
              onClick={createWorkspace}
              className="bg-black text-white text-xs font-bold py-3 rounded-lg hover:bg-zinc-800 transition uppercase tracking-tighter"
            >
              Create Workspace
            </button>
          </div>
        </div>

        {/* Workspaces List */}
        <div>
          <h2 className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-4">
            Your Workspaces
          </h2>

          <div className="grid gap-3">
            {workspaces.length > 0 ? (
              workspaces.map((workspace) => (
                <div
                  key={workspace._id}
                  onClick={() => router.push(`/workspace/${workspace._id}`)}
                  className="group bg-white border border-gray-200 rounded-xl p-5 cursor-pointer hover:border-black transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-sm group-hover:underline underline-offset-2">
                        {workspace.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {workspace.description || "Personal workspace"}
                      </p>
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono">
                      {workspace._id.slice(-4).toUpperCase()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 border border-dashed border-gray-200 rounded-xl">
                <p className="text-xs text-gray-400 uppercase">
                  No workspaces found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
