import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import { taskModel } from "@/src/models/task.model";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    const tasks = await taskModel.find({ project: id }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, tasks });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}