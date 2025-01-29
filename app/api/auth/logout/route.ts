import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout successful" });

  // Clear the authToken cookie
  response.cookies.set("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    path: "/", // Ensure the cookie is cleared for the entire app
    maxAge: 0, // Expire immediately
  });

  // Clear the refreshToken cookie if used
  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
