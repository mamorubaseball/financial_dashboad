// 月次資産データの型
export interface MonthlyAsset {
  month: string
  資産額: number
}

// 収入データの型
export interface Income {
  name: string
  value: number
  month: string
}

// 支出データの型
export interface Expense {
  name: string
  value: number
  month: string
}

// 資産配分データの型
export interface AssetAllocation {
  name: string
  value: number
  percentage: number
  month: string
}

// カテゴリーデータの型（必要に応じて定義）
export interface Category {
  id: string
  name: string
  type: string
}

// 月次変動データの型
export interface MonthlyChange {
  currentAsset: number
  previousAsset: number
  change: number
  changePercent: number
}
