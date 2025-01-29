import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loadData } from "@/shared/lib/loadData";

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY || "example_access_secret_key";
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || "example_refresh_secret_key";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const users = await loadData<{ id: string; email: string; username: string; password: string; plan: string }>("users.json");
    const user = users.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, username: user.username, plan: user.plan },
      ACCESS_SECRET_KEY,
      { expiresIn: "1d" } // Short-lived access token
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      REFRESH_SECRET_KEY,
      { expiresIn: "7d" } // Long-lived refresh token
    );

    const response = NextResponse.json({
      message: "Login successful",
      user: { id: user.id, email: user.email, plan: user.plan },
    });

    // Set cookies for both tokens
    response.cookies.set({
      name: "authToken",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
    });

    response.cookies.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Error in login API:", err);
    return NextResponse.json({ message: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
