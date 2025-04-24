import type { MonthlyAsset, Income, Expense, AssetAllocation, Category } from "@/lib/types"
import type { SheetData } from "@/components/columns"

// Google Sheets APIのキー
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY || ""

// スプレッドシートID
const SPREADSHEET_ID = process.env.SPREADSHEET_ID || ""

// シート名の定義
const SHEETS = {
  MONTHLY_ASSETS: "Monthly Assets",
  INCOMES: "Incomes",
  EXPENSES: "Expenses",
  ASSET_ALLOCATIONS: "Asset Allocations",
  CATEGORIES: "Categories",
}

// 共通のシートデータ取得関数
async function fetchSheetDataGeneric(sheetName: string): Promise<any[]> {
  // 環境変数のチェック
  if (!API_KEY) {
    console.error("GOOGLE_SHEETS_API_KEY is not set")
    throw new Error("Google Sheets API Key is not configured")
  }

  if (!SPREADSHEET_ID) {
    console.error("SPREADSHEET_ID is not set")
    throw new Error("Spreadsheet ID is not configured")
  }

  try {
    // Google Sheets APIを使用してデータを取得
    console.log(`Fetching data from spreadsheet: ${SPREADSHEET_ID}, sheet: ${sheetName}`)

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetName)}?key=${API_KEY}`
    console.log(`API URL (without key): ${url.replace(API_KEY, "API_KEY")}`)

    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Google Sheets API error: Status ${response.status}, Response: ${errorText}`)
      throw new Error(`Google Sheets API error: Status ${response.status}`)
    }

    const data = await response.json()
    console.log(`API response received for ${sheetName}:`, JSON.stringify(data).substring(0, 200) + "...")

    // APIからのレスポンスを解析
    const rows = data.values || []

    if (rows.length === 0) {
      console.warn(`No data found in the ${sheetName} sheet`)
      return []
    }

    // ヘッダー行を取得
    const headers = rows[0] || []
    console.log(`Headers for ${sheetName}:`, headers)

    // データ行を処理
    return rows.slice(1).map((row: any[]) => {
      const item: Record<string, any> = {}

      // 各列のデータをヘッダーに基づいてマッピング
      headers.forEach((header: string, i: number) => {
        if (header) {
          item[header] = row[i] || ""
        }
      })

      return item
    })
  } catch (error) {
    console.error(`Failed to fetch ${sheetName} data:`, error)
    throw error
  }
}

// 利用可能な月のリストを取得
export async function fetchAvailableMonths(): Promise<string[]> {
  try {
    const data = await fetchSheetDataGeneric(SHEETS.MONTHLY_ASSETS)

    if (!data || data.length === 0) {
      console.log("No monthly asset data available, using default months")
      return getDefaultMonths()
    }

    const months = data.map((item) => item.month).filter(Boolean)

    if (months.length === 0) {
      console.log("No valid months found in data, using default months")
      return getDefaultMonths()
    }

    return [...new Set(months)].sort((a, b) => b.localeCompare(a)) // 重複を削除し、降順にソート
  } catch (error) {
    console.error("Error in fetchAvailableMonths:", error)
    return getDefaultMonths()
  }
}

// デフォルトの月リストを取得
function getDefaultMonths(): string[] {
  return ["2025/04/01", "2025/03/01", "2025/02/01", "2025/01/01", "2024/12/01"]
}

// 月次資産データを取得
export async function fetchMonthlyAssets(): Promise<MonthlyAsset[]> {
  try {
    const data = await fetchSheetDataGeneric(SHEETS.MONTHLY_ASSETS)
    return data.map((item) => ({
      month: item.month,
      資産額: Number(item.amount) || 0,
    }))
  } catch (error) {
    console.error("Error in fetchMonthlyAssets:", error)
    // エラー時にはダミーデータを返す
    return [
      { month: "2024/11", 資産額: 4200000 },
      { month: "2024/12", 資産額: 4350000 },
      { month: "2025/01", 資産額: 4500000 },
      { month: "2025/02", 資産額: 4750000 },
      { month: "2025/03", 資産額: 5276113 },
      { month: "2025/04", 資産額: 4953854 },
    ]
  }
}

// 特定の月の資産データを取得
export async function fetchMonthlyAssetByMonth(month: string): Promise<MonthlyAsset | null> {
  try {
    const allAssets = await fetchMonthlyAssets()
    return allAssets.find((asset) => asset.month === month) || null
  } catch (error) {
    console.error(`Error in fetchMonthlyAssetByMonth for ${month}:`, error)
    return null
  }
}

// 収入データを取得（月別）
export async function fetchIncomes(month = ""): Promise<Income[]> {
  try {
    const data = await fetchSheetDataGeneric(SHEETS.INCOMES)
    const filteredData = month ? data.filter((item) => item.month === month) : data

    return filteredData.map((item) => ({
      name: item.category,
      value: Number(item.amount) || 0,
      month: item.month,
    }))
  } catch (error) {
    console.error("Error in fetchIncomes:", error)
    // エラー時にはダミーデータを返す
    return [
      { name: "会社収入", value: 902389, month: "2025/04" },
      { name: "投資運用益", value: -322259, month: "2025/04" },
      { name: "副業", value: 16668, month: "2025/04" },
    ]
  }
}

// 支出データを取得（月別）
export async function fetchExpenses(month = ""): Promise<Expense[]> {
  try {
    const data = await fetchSheetDataGeneric(SHEETS.EXPENSES)
    const filteredData = month ? data.filter((item) => item.month === month) : data

    return filteredData.map((item) => ({
      name: item.category,
      value: Number(item.amount) || 0,
      month: item.month,
    }))
  } catch (error) {
    console.error("Error in fetchExpenses:", error)
    // エラー時にはダミーデータを返す
    return [
      { name: "家賃", value: 85456, month: "2025/04" },
      { name: "ジム費", value: 10680, month: "2025/04" },
      { name: "奨学金", value: 11325, month: "2025/04" },
      { name: "通信費", value: 3280, month: "2025/04" },
      { name: "光熱費", value: 12000, month: "2025/04" },
      { name: "サブスク", value: 1690, month: "2025/04" },
      { name: "食費+その他", value: 59852, month: "2025/04" },
    ]
  }
}

// 資産配分データを取得（月別）
export async function fetchAssetAllocations(month = ""): Promise<AssetAllocation[]> {
  try {
    const data = await fetchSheetDataGeneric(SHEETS.ASSET_ALLOCATIONS)
    const filteredData = month ? data.filter((item) => item.month === month) : data

    const parsedData = filteredData.map((item) => ({
      name: item.category,
      value: Number(item.amount) || 0,
      month: item.month,
    }))

    const total = parsedData.reduce((sum, item) => sum + item.value, 0)

    return parsedData.map((item) => ({
      ...item,
      percentage: total > 0 ? Number(((item.value / total) * 100).toFixed(1)) : 0,
    }))
  } catch (error) {
    console.error("Error in fetchAssetAllocations:", error)
    // エラー時にはダミーデータを返す
    return [
      { name: "国内株式", value: 576170, percentage: 11.6, month: "2025/04" },
      { name: "米国株式", value: 2183833, percentage: 44.1, month: "2025/04" },
      { name: "投資信託", value: 2027117, percentage: 40.9, month: "2025/04" },
      { name: "預り金", value: 160000, percentage: 3.2, month: "2025/04" },
    ]
  }
}

// 月ごとの資産変動を取得
export async function fetchMonthlyChange(month: string): Promise<{
  currentAsset: number
  previousAsset: number
  change: number
  changePercent: number
}> {
  try {
    const allAssets = await fetchMonthlyAssets()
    console.log("allAssets: ${allAssets}")

    // データがない場合はデフォルト値を返す
    if (!allAssets || allAssets.length === 0) {
      console.log(`No asset data available for any month`)
      return getDefaultMonthlyChange(month)
    }

    // 月の昇順にソート
    const sortedAssets = [...allAssets].sort((a, b) => a.month.localeCompare(b.month))

    // 指定された月のデータを検索
    const currentAssetData = sortedAssets.find((asset) => asset.month === month)

    // 指定された月のデータが見つからない場合
    if (!currentAssetData) {
      console.log(`No asset data found for month: ${month}, using default values`)
      return getDefaultMonthlyChange(month)
    }

    const currentAssetIndex = sortedAssets.findIndex((asset) => asset.month === month)
    const currentAsset = currentAssetData.資産額

    // 前月のデータを取得（存在しない場合は現在の資産額を使用）
    const previousAsset = currentAssetIndex > 0 ? sortedAssets[currentAssetIndex - 1].資産額 : currentAsset

    const change = currentAsset - previousAsset
    const changePercent = previousAsset !== 0 ? (change / previousAsset) * 100 : 0

    return {
      currentAsset,
      previousAsset,
      change,
      changePercent,
    }
  } catch (error) {
    console.error(`Error in fetchMonthlyChange for ${month}:`, error)
    return getDefaultMonthlyChange(month)
  }
}

// 月ごとの資産変動のデフォルト値を取得
function getDefaultMonthlyChange(month: string): {
  currentAsset: number
  previousAsset: number
  change: number
  changePercent: number
} {
  // 月に応じてデフォルト値を変更
  if (month === "2025/04") {
    return {
      currentAsset: 4953854,
      previousAsset: 5276113,
      change: -322259,
      changePercent: -6.1,
    }
  } else if (month === "2025/03") {
    return {
      currentAsset: 5276113,
      previousAsset: 4750000,
      change: 526113,
      changePercent: 11.1,
    }
  } else if (month === "2025/02") {
    return {
      currentAsset: 4750000,
      previousAsset: 4500000,
      change: 250000,
      changePercent: 5.6,
    }
  } else {
    // その他の月のデフォルト値
    return {
      currentAsset: 4500000,
      previousAsset: 4350000,
      change: 150000,
      changePercent: 3.4,
    }
  }
}

// カテゴリーデータを取得
export async function fetchCategories(): Promise<Category[]> {
  try {
    const data = await fetchSheetDataGeneric(SHEETS.CATEGORIES)
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
    }))
  } catch (error) {
    console.error("Error in fetchCategories:", error)
    // エラー時にはダミーデータを返す
    return [
      { id: "1", name: "住居費", type: "expense" },
      { id: "2", name: "食費", type: "expense" },
      { id: "3", name: "交通費", type: "expense" },
      { id: "4", name: "給与", type: "income" },
      { id: "5", name: "投資", type: "income" },
    ]
  }
}

// 元の関数も残しておく（後方互換性のため）
export async function fetchSheetData(): Promise<SheetData[]> {
  try {
    // 任意のシートからデータを取得（例としてMonthly Assetsを使用）
    const data = await fetchSheetDataGeneric(SHEETS.MONTHLY_ASSETS)
    return data.map((item, index) => ({
      id: (index + 1).toString(),
      name: `Item ${index + 1}`,
      email: "example@example.com",
      role: "user",
      status: index % 2 === 0 ? "active" : "inactive",
      createdAt: new Date().toISOString(),
    }))
  } catch (error) {
    console.error("Error in fetchSheetData:", error)
    return getDummyData()
  }
}

// テスト用のダミーデータ
function getDummyData(): SheetData[] {
  return [
    {
      id: "1",
      name: "山田太郎",
      email: "yamada@example.com",
      role: "管理者",
      status: "active",
      createdAt: "2023-01-15",
    },
    {
      id: "2",
      name: "佐藤花子",
      email: "sato@example.com",
      role: "ユーザー",
      status: "active",
      createdAt: "2023-02-20",
    },
    {
      id: "3",
      name: "鈴木一郎",
      email: "suzuki@example.com",
      role: "ユーザー",
      status: "inactive",
      createdAt: "2023-03-10",
    },
    {
      id: "4",
      name: "田中誠",
      email: "tanaka@example.com",
      role: "ゲスト",
      status: "pending",
      createdAt: "2023-04-05",
    },
    {
      id: "5",
      name: "伊藤美咲",
      email: "ito@example.com",
      role: "ユーザー",
      status: "active",
      createdAt: "2023-05-12",
    },
  ]
}
