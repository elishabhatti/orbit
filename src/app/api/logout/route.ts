import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // ❌ delete cookie properly
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // kills cookie
      path: "/",
    });

    return response;

  } catch (error: any) {
    return NextResponse.json(
      { message: "Logout failed", error: error.message },
      { status: 500 }
    );
  }
}