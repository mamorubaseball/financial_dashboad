import { NextResponse } from "next/server"
import { fetchAvailableMonths } from "@/lib/sheets"

export async function GET() {
  try {
    const months = await fetchAvailableMonths()
    return NextResponse.json({ months })
  } catch (error) {
    console.error("API error in available-months:", error)
    return NextResponse.json({ error: "Failed to fetch available months" }, { status: 500 })
  }
}
