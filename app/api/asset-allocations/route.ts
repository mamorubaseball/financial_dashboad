import { NextResponse } from "next/server"
import { fetchAssetAllocations } from "@/lib/sheets"

export async function GET() {
  try {
    const data = await fetchAssetAllocations()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("API error in asset-allocations:", error)
    return NextResponse.json({ error: "Failed to fetch asset allocations data" }, { status: 500 })
  }
}
