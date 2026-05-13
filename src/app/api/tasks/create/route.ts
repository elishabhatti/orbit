import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import { taskModel } from "@/src/models/task.model"; // Apna path check karlein

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // Debugging ke liye terminal mein check karo
    console.log("Creating Task with data:", body);

    const { title, description, status, priority, projectId } = body;

    // IMPORTANT: Frontend se agar "in-progress" aa raha hai toh usse "in progress" karo
    const sanitizedStatus = status === "in-progress" ? "in progress" : status;

    const newTask = await taskModel.create({
      title,
      description: description || "",
      status: sanitizedStatus || "todo",
      priority: priority || "medium",
      project: projectId, // Aapka schema 'project' mang raha hai, sahi hai
    });

    return NextResponse.json({ success: true, task: newTask });
  } catch (error: any) {
    console.error("TASK CREATE ERROR:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
