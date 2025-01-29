import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import fs from "fs/promises";
import path from "path";
import plans from "@/shared/data/plans.json";
import { loadData } from "@/shared/lib/loadData";

export async function POST(req: Request) {
  const { email, username, password, passwordConfirm, plan } = await req.json();

  // Validate required fields
  if (!email || !username || !password || !passwordConfirm || !plan) {
    return NextResponse.json({ message: "Email, username, password, password confirmation, and plan are required" }, { status: 400 });
  }

  // Validate password confirmation
  if (password !== passwordConfirm) {
    return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
  }

  // Load users and subscriptions safely
  const users = await loadData<{ id: string; email: string; username: string; password: string; plan: string }>("users.json");
  const subscriptions = await loadData<{ userId: string; planId: string; status: string }>("subscriptions.json");

  // Validate if the plan is valid
  const validPlan = plans.find((p) => p.id === plan);
  if (!validPlan) {
    return NextResponse.json({ message: "Invalid plan. Please choose a valid subscription plan." }, { status: 400 });
  }

  // Check if the email is already in use
  const emailExists = users.find((user) => user.email === email);
  if (emailExists) {
    return NextResponse.json({ message: "Email is already in use" }, { status: 400 });
  }

  // Check if the username is already in use
  const usernameExists = users.find((user) => user.username === username);
  if (usernameExists) {
    return NextResponse.json({ message: "Username is already in use" }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = {
    id: String(users.length + 1),
    email,
    username,
    password: hashedPassword,
    plan,
  };

  // Save the new user
  const usersFilePath = path.join(process.cwd(), "app/shared/data", "users.json");
  const updatedUsers = [...users, newUser];
  await fs.writeFile(usersFilePath, JSON.stringify(updatedUsers, null, 2));

  // Create a new subscription
  const newSubscription = {
    userId: newUser.id,
    planId: plan,
    status: "active",
  };

  // Save the new subscription
  const subscriptionsFilePath = path.join(process.cwd(), "app/shared/data", "subscriptions.json");
  const updatedSubscriptions = [...subscriptions, newSubscription];
  await fs.writeFile(subscriptionsFilePath, JSON.stringify(updatedSubscriptions, null, 2));

  // Success response
  return NextResponse.json({
    message: "User registered successfully",
    user: { id: newUser.id, email: newUser.email, username: newUser.username, plan: newUser.plan },
    subscription: newSubscription,
  });
}
