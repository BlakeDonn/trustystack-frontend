// app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import { getDashboardDTO } from "@/app/data/dashboard-data"; // or similar

export async function GET() {
  try {
    const data = await getDashboardDTO(); // your server logic
    if (!data) {
      // e.g., user not signed in or token mismatch
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Failed to fetch dashboard data:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
