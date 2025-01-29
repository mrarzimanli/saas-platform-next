import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY || "example_access_secret_key";
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || "example_refresh_secret_key";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "Refresh token required" }, { status: 401 });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);

    // Narrow the type of decoded to JwtPayload
    if (typeof decoded === "string" || !decoded.id) {
      return NextResponse.json({ message: "Invalid token payload" }, { status: 401 });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      ACCESS_SECRET_KEY,
      { expiresIn: "1d" } // Access token expires in 1 day
    );

    // Optional: Reissue a new refresh token
    const newRefreshToken = jwt.sign(
      { id: decoded.id },
      REFRESH_SECRET_KEY,
      { expiresIn: "7d" } // Refresh token expires in 7 days
    );

    // Set the new tokens in cookies
    const response = NextResponse.json({
      message: "Token refreshed successfully",
    });

    response.cookies.set({
      name: "authToken",
      value: newAccessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
    });

    response.cookies.set({
      name: "refreshToken",
      value: newRefreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ message: "Invalid or expired refresh token" }, { status: 401 });
  }
}
