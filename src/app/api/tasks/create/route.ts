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
    const { title, projectId, workspaceId, priority } = body;

    if (!title || !projectId || !workspaceId) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const task = await taskModel.create({
      title,
      project: projectId,
      workspace: workspaceId,
      priority: priority || "medium",
      status: "todo",
      createdBy: user._id,
    });

    return NextResponse.json({ success: true, task });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}