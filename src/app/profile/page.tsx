"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const logout = async () => {
    await axios.post("/api/logout");
    router.push("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/me");
        setUser(res.data);
      } catch (err) {
        router.push("/login");
      }
    };
    fetchUser();
  }, []);

  if (!user) return <div className="h-screen flex items-center justify-center text-sm text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold">
              {user.fullName?.[0]}
            </div>
            <div>
              <h1 className="text-lg font-semibold">{user.fullName}</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="px-4 py-2 text-xs font-medium border border-gray-200 rounded-md hover:bg-gray-50 transition"
          >
            Sign out
          </button>
        </div>

        <div className="grid gap-4">
          <div className="p-6 bg-white border border-gray-200 rounded-xl">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Active Workspace</p>
            <p className="text-sm font-medium">{user.site || "No workspace found"}.orbit.app</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;