import { NextResponse } from "next/server"
import { fetchIncomes } from "@/lib/sheets"

export async function GET() {
  try {
    const data = await fetchIncomes()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("API error in incomes:", error)
    return NextResponse.json({ error: "Failed to fetch incomes data" }, { status: 500 })
  }
}
