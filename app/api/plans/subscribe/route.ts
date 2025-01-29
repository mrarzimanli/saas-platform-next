import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
import { loadData } from "@/shared/lib/loadData";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  const { userId, planId } = await request.json();

  // Load users safely
  const users = await loadData<{ id: string; email: string; password: string; plan: string }>("users.json");

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const newSubscription = {
    userId,
    planId,
    status: "active",
  };

  // Load subscriptions safely
  const subscriptions = await loadData<{ userId: string; planId: string; status: string }>("subscriptions.json");

  const updatedSubscriptions = [...subscriptions, newSubscription];
  const filePath = path.join(process.cwd(), "app/shared/data", "subscriptions.json");
  await fs.writeFile(filePath, JSON.stringify(updatedSubscriptions, null, 2));

  return NextResponse.json({ message: "Subscription successful", subscription: newSubscription });
}
