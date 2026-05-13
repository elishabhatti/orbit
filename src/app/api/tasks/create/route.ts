import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import { getAuthUser } from "@/src/lib/auth";
import { taskModel } from "@/src/models/task.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, projectId, workspaceId, priority, description } = body;

    const newTask = await taskModel.create({
      title,
      description,
      project: projectId,
      workspace: workspaceId,
      priority: priority || "medium",
      status: "todo",
      createdBy: user._id,
    });

    return NextResponse.json({ success: true, task: newTask });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}