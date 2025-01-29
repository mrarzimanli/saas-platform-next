import { NextResponse } from "next/server";
import { loadData } from "@/shared/lib/loadData";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  if (!id) {
    return NextResponse.json({ message: "ID does not exist" }, { status: 404 });
  }

  // Load plans from a local file
  const plans = await loadData<{ id: string; name: string; price: number; features: string[] }>("plans.json");

  // Find the plan by ID
  const plan = plans.find((p) => p.id === id);

  if (!plan) {
    return NextResponse.json({ message: "Plan not found" }, { status: 404 });
  }

  // Return the plan details
  return NextResponse.json({ data: plan });
}
