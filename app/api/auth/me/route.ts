import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { loadData } from "@/shared/lib/loadData";
import { Subscription, User } from "@/shared/types";

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY || "example_secret_key";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  try {
    // Verify the JWT
    const decoded = jwt.verify(token, ACCESS_SECRET_KEY) as { id: string; email: string };

    // Load typed user data and subscriptions
    const users = await loadData<User>("users.json");
    const subscriptions = await loadData<Subscription>("subscriptions.json");

    // Find the user
    const user = users.find((u: User) => u.id === decoded.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Find the user's subscription
    const subscription = subscriptions.find((sub: Subscription) => sub.userId === user.id);

    if (!subscription) {
      return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
    }

    // Include subscription details in the response
    const response = {
      id: user.id,
      email: user.email,
      username: user.username,
      subscription: {
        planId: subscription.planId,
        status: subscription.status,
      },
    };

    return NextResponse.json({
      message: "User data retrieved successfully",
      data: response,
    });
  } catch (err) {
    console.error("Token verification failed:", err);
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}
