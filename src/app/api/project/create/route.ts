import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import { projectModel } from "@/src/models/project.model"; 

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, key, workspaceId } = body;

    // Validation
    if (!name || !key || !workspaceId) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const newProject = await projectModel.create({
      name,
      key,
      workspace: workspaceId,
      status: "active"
    });

    return NextResponse.json({ success: true, project: newProject });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}