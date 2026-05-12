import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import { WorkspaceService } from "@/src/services/workspace.services";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();

    const workspace = await WorkspaceService.getWorkspaceById(params.id);

    if (!workspace) {
      return NextResponse.json(
        { success: false, message: "Workspace not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      workspace,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
