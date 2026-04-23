import { connectDB } from "@/src/lib/db";
import { userModel } from "@/src/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        await connectDB();
        const { fullName, email, password, site, work, team } = await req.json();
        const newUser = await userModel.create({
        fullName,
        email,
        password,
        site,
        work,
        team,
        });
        await newUser.save();
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error from the user post function", error);       
    }
}