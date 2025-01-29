import { NextResponse } from "next/server";
import plans from "@/shared/data/plans.json";

export async function GET() {
  return NextResponse.json({
    message: "Plans retrieved successfully",
    data: plans,
  });
}
