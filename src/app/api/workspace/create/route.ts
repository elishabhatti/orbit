import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import { getAuthUser } from "@/src/lib/auth";
import { WorkspaceService } from "@/src/services/workspace.services";

export async function POST(req: NextRequest) {
  await connectDB();

  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const workspace = await WorkspaceService.createWorkspace(user._id, body);

  return NextResponse.json({
    success: true,
    workspace,
  });
}
