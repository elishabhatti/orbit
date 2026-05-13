"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface Task {
  _id: string;
  title: string;
  status: "todo" | "in progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
}

const ProjectBoard = () => {
  const { id: projectId } = useParams(); // URL se project ID le rahe hain
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Modal & Form States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Task["status"]>("todo");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statuses: Task["status"][] = ["todo", "in progress", "review", "done"];

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`/api/tasks/project/${projectId}`); // Path sahi rakhna
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Error fetching tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) fetchTasks();
  }, [projectId]);

  // --- Create Task Function ---
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    setIsSubmitting(true);
    try {
      await axios.post("/api/tasks/create", {
        title: taskTitle,
        status: selectedStatus,
        priority: priority,
        projectId: projectId, // Backend ko bata rahe hain kis project ka task hai
      });

      setTaskTitle("");
      setIsModalOpen(false);
      fetchTasks(); // List refresh karne ke liye
    } catch (err) {
      alert("Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="p-12 text-xs uppercase tracking-[0.2em] text-gray-400">
        Loading Board...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-12 text-[#111]">
      <div className="max-w-full mx-auto">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tighter">
              Project Board
            </h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
              Manage your sprint tasks
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedStatus("todo");
              setIsModalOpen(true);
            }}
            className="bg-black text-white px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition"
          >
            New Task
          </button>
        </header>

        <div className="flex gap-6 overflow-x-auto pb-8">
          {statuses.map((status) => (
            <div key={status} className="min-w-[300px] flex-1">
              <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  {status.replace("-", " ")}
                </h2>
                <span className="text-[10px] font-mono text-gray-300">
                  {tasks.filter((t) => t.status === status).length}
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
                      <h3 className="text-sm font-bold leading-tight group-hover:underline">
                        {task.title}
                      </h3>
                      <div className="mt-4 flex justify-between items-center">
                        <span
                          className={`text-[8px] font-bold uppercase px-2 py-1 rounded ${task.priority === "urgent" ? "bg-red-50 text-red-600" : "bg-zinc-100 text-gray-50"}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}

                {/* Quick Add Button */}
                <button
                  onClick={() => {
                    setSelectedStatus(status);
                    setIsModalOpen(true);
                  }}
                  className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:border-gray-300 transition-all"
                >
                  + Add Item
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- Minimalist Modal for New Task --- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl">
              <h2 className="text-xl font-black tracking-tight mb-6">
                Create Task
              </h2>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <input
                  autoFocus
                  placeholder="Task title..."
                  className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl outline-none focus:border-black text-sm transition"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />

                <select
                  className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl text-xs font-bold uppercase tracking-widest outline-none"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>

                <div className="flex gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-gray-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest bg-black text-white rounded-xl shadow-lg active:scale-95 transition"
                  >
                    {isSubmitting ? "Syncing..." : "Create"}
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

export default ProjectBoard;
