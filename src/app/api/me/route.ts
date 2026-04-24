import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/src/lib/db";
import { userModel } from "@/src/models/user.model";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // 1. Get token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    // 2. Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
    };

    // 3. Find user
    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 4. Return user
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Invalid token", error: error.message },
      { status: 401 },
    );
  }
}
