import { NextResponse } from "next/server"
import { fetchExpenses } from "@/lib/sheets"

export async function GET() {
  try {
    const data = await fetchExpenses()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("API error in expenses:", error)
    return NextResponse.json({ error: "Failed to fetch expenses data" }, { status: 500 })
  }
}
