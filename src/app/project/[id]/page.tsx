"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface Task {
  _id: string;
  title: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
}

const ProjectBoard = () => {
  const { id } = useParams();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const statuses: Task["status"][] = ["todo", "in-progress", "review", "done"];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`/api/task/project/${id}`);
        setTasks(res.data.tasks);
      } catch (err) {
        console.error("Error fetching tasks", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [id]);

  if (loading) return <div className="p-12 text-xs uppercase tracking-[0.2em] text-gray-400">Loading Board...</div>;

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-12 text-[#111]">
      <div className="max-w-full mx-auto">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tighter">Project Board</h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Manage your sprint tasks</p>
          </div>
          <button className="bg-black text-white px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition">
            New Task
          </button>
        </header>

        {/* Kanban Board Layout */}
        <div className="flex gap-6 overflow-x-auto pb-8">
          {statuses.map((status) => (
            <div key={status} className="min-w-[280px] flex-1">
              <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  {status.replace("-", " ")}
                </h2>
                <span className="text-[10px] font-mono text-gray-300">
                  {tasks.filter(t => t.status === status).length}
                </span>
              </div>

              <div className="space-y-3">
                {tasks
                  .filter((t) => t.status === status)
                  .map((task) => (
                    <div 
                      key={task._id} 
                      className="bg-white border border-gray-200 p-5 rounded-2xl hover:border-black transition-all cursor-pointer group shadow-sm hover:shadow-md"
                    >
                      <h3 className="text-sm font-bold leading-tight group-hover:underline underline-offset-2">
                        {task.title}
                      </h3>
                      <div className="mt-4 flex justify-between items-center">
                        <span className={`text-[8px] font-bold uppercase px-2 py-1 rounded ${
                          task.priority === 'urgent' ? 'bg-red-50 text-red-600' : 'bg-zinc-100 text-gray-500'
                        }`}>
                          {task.priority}
                        </span>
                        <div className="w-5 h-5 rounded-full bg-zinc-200" />
                      </div>
                    </div>
                  ))}

                {/* Quick Add Placeholder */}
                <button className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:border-gray-300 hover:text-gray-400 transition-all">
                  + Add Item
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectBoard;