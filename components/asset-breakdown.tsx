"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchAssetAllocations, fetchMonthlyChange } from "@/lib/sheets"
import { AssetAllocation } from "@/components/asset-allocation"
import { useMonth } from "@/contexts/month-context"
import { Skeleton } from "@/components/ui/skeleton"

interface AssetBreakdownProps {
  month?: string
}

export function AssetBreakdown({ month }: AssetBreakdownProps) {
  const { currentMonth } = useMonth()
  const selectedMonth = month || currentMonth

  const [data, setData] = useState([])
  const [monthlyChange, setMonthlyChange] = useState({
    currentAsset: 0,
    previousAsset: 0,
    change: 0,
    changePercent: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const [allocationsData, changeData] = await Promise.all([
          fetchAssetAllocations(selectedMonth),
          fetchMonthlyChange(selectedMonth),
        ])
        setData(allocationsData)
        setMonthlyChange(changeData)
      } catch (error) {
        console.error("Failed to load asset breakdown data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (selectedMonth) {
      loadData()
    }
  }, [selectedMonth])

  // 月表示のフォーマット
  const formatMonthDisplay = (monthStr: string) => {
    if (!monthStr) return ""
    const [year, month] = monthStr.split("/")
    return `${year}年${Number.parseInt(month)}月`
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>資産内訳の詳細</CardTitle>
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>資産配分</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <Skeleton className="h-[250px] w-[250px] rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 合計を計算
  const totalValue = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>資産内訳の詳細</CardTitle>
          <p className="text-sm text-muted-foreground">{formatMonthDisplay(selectedMonth)}時点</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm font-medium">資産区分別評価額と損益</div>
            <div className="space-y-4">
              {data.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>{item.name}</div>
                  <div className="flex items-center gap-4">
                    <div className="font-medium">¥{item.value.toLocaleString()}</div>
                    <div className={item.value < 0 ? "text-red-500" : "text-emerald-500"}>
                      {item.value < 0 ? "-" : "+"}¥{Math.abs(Math.round(item.value * 0.1)).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between border-t pt-2 font-bold">
                <div>総資産額</div>
                <div className="flex items-center gap-4">
                  <div>¥{totalValue.toLocaleString()}</div>
                  <div className={monthlyChange.change < 0 ? "text-red-500" : "text-emerald-500"}>
                    {monthlyChange.change < 0 ? "-" : "+"}¥{Math.abs(monthlyChange.change).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>資産配分</CardTitle>
        </CardHeader>
        <CardContent>
          <AssetAllocation month={selectedMonth} />
        </CardContent>
      </Card>
    </div>
  )
}
