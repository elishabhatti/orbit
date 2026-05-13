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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user?.fullName}
            </h1>

            <p className="text-sm text-gray-500">Manage your workspaces</p>
          </div>

          <button
            onClick={logout}
            className="border px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>

        <div className="bg-white border rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Create Workspace</h2>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Workspace name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg px-4 py-3"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-lg px-4 py-3"
            />

            <button
              onClick={createWorkspace}
              className="bg-black text-white py-3 rounded-lg"
            >
              Create Workspace
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Workspaces</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workspaces.map((workspace) => (
              <div
                key={workspace._id}
                onClick={() => router.push(`/workspace/${workspace._id}`)}
                className="bg-white border rounded-2xl p-6 cursor-pointer hover:border-black transition"
              >
                <h3 className="font-semibold text-lg">{workspace.name}</h3>

                <p className="text-sm text-gray-500 mt-2">
                  {workspace.description || "No description"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
