import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
import subscriptions from "@/shared/data/subscriptions.json";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  const { userId } = await request.json();

  // Validate the input
  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  // Find the user's subscription
  const subscriptionIndex = subscriptions.findIndex((sub) => sub.userId === userId && sub.status === "active");

  if (subscriptionIndex === -1) {
    return NextResponse.json({ message: "Active subscription not found for the user" }, { status: 404 });
  }

  // Update the subscription status to "canceled"
  subscriptions[subscriptionIndex].status = "canceled";

  // Write the updated subscriptions back to the file
  const filePath = path.join(process.cwd(), "app/shared/data", "subscriptions.json");
  await fs.writeFile(filePath, JSON.stringify(subscriptions, null, 2));

  return NextResponse.json({
    message: "Subscription canceled successfully",
    subscription: subscriptions[subscriptionIndex],
  });
}
