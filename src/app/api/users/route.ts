import { connectDB } from "@/src/lib/db";
import { userModel } from "@/src/models/user.model";
import jwt from "jsonwebtoken";
import { hash } from "argon2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { fullName, email, password, site, work, team } =
      await req.json();

    const hashedPassword = hash(password);

    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      site,
      work,
      team,
    });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      { message: "User created" },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true, // ⚠️ in dev you can make it false if needed
      sameSite: "strict",
      path: "/",
    });

    return response;

  } catch (error: any) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}