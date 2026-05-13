import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import { projectModel } from "@/src/models/project.model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params; // Await params here too

    const projects = await projectModel.find({ workspace: id });
    
    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}