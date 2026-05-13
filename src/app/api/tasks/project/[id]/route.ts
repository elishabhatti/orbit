import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import { taskModel } from "@/src/models/task.model";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const tasks = await taskModel.find({ project: params.id }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, tasks });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}