import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST() {
  try {
    // キャッシュを再検証
    revalidatePath("/")
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    return NextResponse.json({ revalidated: false, error: "Failed to revalidate" }, { status: 500 })
  }
}
