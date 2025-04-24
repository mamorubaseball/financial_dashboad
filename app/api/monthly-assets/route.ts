import { NextResponse } from "next/server"
import { fetchMonthlyAssets } from "@/lib/sheets"

export async function GET() {
  try {
    const data = await fetchMonthlyAssets()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("API error in monthly-assets:", error)
    return NextResponse.json({ error: "Failed to fetch monthly assets data" }, { status: 500 })
  }
}
