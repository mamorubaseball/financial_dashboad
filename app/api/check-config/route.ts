import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY
  const spreadsheetId = process.env.SPREADSHEET_ID

  const issues = []

  if (!apiKey) {
    issues.push("GOOGLE_SHEETS_API_KEY is not set")
  } else if (apiKey.length < 10) {
    issues.push("GOOGLE_SHEETS_API_KEY appears to be invalid (too short)")
  }

  if (!spreadsheetId) {
    issues.push("SPREADSHEET_ID is not set")
  } else if (spreadsheetId.length < 10) {
    issues.push("SPREADSHEET_ID appears to be invalid (too short)")
  }

  return NextResponse.json({
    apiKeySet: !!apiKey,
    spreadsheetIdSet: !!spreadsheetId,
    issues: issues.length > 0 ? issues : null,
    status: issues.length > 0 ? "configuration_issues" : "ok",
  })
}
