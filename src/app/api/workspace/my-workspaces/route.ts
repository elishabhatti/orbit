import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import { getAuthUser } from "@/src/lib/auth";
import { WorkspaceService } from "@/src/services/workspace.services";

export async function GET() {
  try {
    await connectDB();

    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Service method ka use
    const workspaces = await WorkspaceService.getMyWorkspaces(user._id);

    return NextResponse.json({
      success: true,
      workspaces,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}