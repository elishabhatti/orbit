"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface Task {
  _id: string;
  title: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: string;
}

const ProjectDetails = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`/api/task/project/${id}`);
        setTasks(res.data.tasks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [id]);

  // Grouping tasks by status
  const columns: Task["status"][] = ["todo", "in-progress", "review", "done"];

  if (loading) return <div className="p-10 text-xs uppercase tracking-widest text-gray-400">Loading Tasks...</div>;

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-full mx-auto">
        <header className="mb-10">
          <h1 className="text-2xl font-black tracking-tighter">Project Board</h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">ID: {id}</p>
        </header>

        {/* Kanban Grid */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((col) => (
            <div key={col} className="min-w-[300px] flex-1">
              <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {col.replace("-", " ")}
                </h2>
                <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full font-bold">
                  {tasks.filter((t) => t.status === col).length}
                </span>
              </div>

              <div className="space-y-3">
                {tasks
                  .filter((t) => t.status === col)
                  .map((task) => (
                    <div 
                      key={task._id} 
                      className="bg-white border border-gray-200 p-4 rounded-xl hover:border-black transition cursor-pointer group"
                    >
                      <h3 className="text-sm font-semibold mb-3">{task.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1 rounded">
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                
                {/* Quick Add Button */}
                <button className="w-full py-2 border border-dashed border-gray-200 rounded-xl text-[10px] uppercase font-bold text-gray-400 hover:border-black hover:text-black transition">
                  + Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;