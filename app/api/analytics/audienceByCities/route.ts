import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { loadData } from "@/shared/lib/loadData";
import jwt from "jsonwebtoken";

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY || "example_secret_key";

export async function GET(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  try {
    // Verify the token
    await jwt.verify(token, ACCESS_SECRET_KEY);

    // Load audience by cities from the JSON file
    const audienceByCities = await loadData("audience-by-cities.json");

    return NextResponse.json({
      message: "Audience by cities retrieved successfully",
      data: audienceByCities,
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}
