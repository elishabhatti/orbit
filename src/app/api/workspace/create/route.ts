import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/src/lib/db";
import { getAuthUser } from "@/src/lib/auth";
import { workspaceModel } from "@/src/models/workspace.model";

interface CreateWorkspaceBody {
  name: string;
  description?: string;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: CreateWorkspaceBody = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { success: false, message: "Workspace name required" },
        { status: 400 }
      );
    }

    const workspace = await workspaceModel.create({
      name: body.name,
      description: body.description,

      owner: user._id,

      members: [
        {
          user: user._id,
          role: "owner",
        },
      ],
    });

    return NextResponse.json(
      {
        success: true,
        workspace,
      },
      { status: 201 }
    );
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