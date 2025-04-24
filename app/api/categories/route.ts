import { NextResponse } from "next/server"
import { fetchCategories } from "@/lib/sheets"

export async function GET() {
  try {
    const data = await fetchCategories()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("API error in categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories data" }, { status: 500 })
  }
}
