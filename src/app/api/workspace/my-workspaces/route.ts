import { NextResponse } from "next/server";

import { connectDB } from "@/src/lib/db";
import { getAuthUser } from "@/src/lib/auth";
import { workspaceModel } from "@/src/models/workspace.model";

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

    const workspaces = await workspaceModel
      .find({
        "members.user": user._id,
      })
      .populate("owner", "fullName email avatar")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      workspaces,
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