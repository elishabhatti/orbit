import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import { workspaceModel } from "@/src/models/workspace.model";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const workspace = await workspaceModel
      .findById(params.id)
      .populate("owner", "fullName email avatar")
      .populate("members.user", "fullName email avatar");

    if (!workspace) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      workspace,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}