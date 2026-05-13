import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import { taskModel } from "@/src/models/task.model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // Next.js 15/16 fix
) {
  try {
    await connectDB();
    const { id } = await params; // Await params here

    const tasks = await taskModel.find({ project: id });

    return NextResponse.json({ success: true, tasks });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
