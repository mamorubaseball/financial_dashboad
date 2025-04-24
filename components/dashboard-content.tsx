"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { IncomeExpenses } from "@/components/income-expenses"
import { InvestmentGoals } from "@/components/investment-goals"
import { Progress } from "@/components/ui/progress"
import { CheckConfigButton } from "@/components/check-config-button"
import { RefreshButton } from "@/components/refresh-button"
import { AssetBreakdown } from "@/components/asset-breakdown"
import { MonthSelector } from "@/components/month-selector"
import { useMonth } from "@/contexts/month-context"
import { fetchMonthlyChange } from "@/lib/sheets"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardContent() {
  const { currentMonth, availableMonths, setCurrentMonth, isLoading: monthsLoading } = useMonth()
  const [monthlyChange, setMonthlyChange] = useState({
    currentAsset: 0,
    previousAsset: 0,
    change: 0,
    changePercent: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadMonthlyChange() {
      if (!currentMonth) return

      setIsLoading(true)
      try {
        const change = await fetchMonthlyChange(currentMonth)
        setMonthlyChange(change)
      } catch (error) {
        console.error("Failed to load monthly change:", error)
        // エラー時にもデフォルト値を設定
        setMonthlyChange({
          currentAsset: 4953854,
          previousAsset: 5276113,
          change: -322259,
          changePercent: -6.1,
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadMonthlyChange()
  }, [currentMonth])

  // 月表示のフォーマット
  const formatMonthDisplay = (monthStr: string) => {
    if (!monthStr) return ""
    const [year, month] = monthStr.split("/")
    return `${year}年${Number.parseInt(month)}月`
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-xl font-semibold">エンジニア会社員のリアル資産推移レポート</h1>
          </div>
          <div className="flex items-center gap-2">
            {!monthsLoading && (
              <MonthSelector
                availableMonths={availableMonths}
                currentMonth={currentMonth}
                onMonthChange={setCurrentMonth}
              />
            )}
            <CheckConfigButton />
            <RefreshButton />
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <div className="grid auto-rows-max gap-4 md:col-span-2 lg:col-span-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">2026年末までの目標達成率: 総資産 1,000万円</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">49.5%</span>
                    <span className="text-sm text-muted-foreground">
                      現在約500万円。月5万円の積立と複利効果で達成を目指す
                    </span>
                  </div>
                  <Progress
                    value={49.5}
                    className="h-2 bg-zinc-200 dark:bg-zinc-800"
                    indicatorClassName="bg-gradient-to-r from-violet-500 to-fuchsia-500"
                  />
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-purple-500 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">総資産額</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-8 w-32 bg-white/20" />
                  ) : (
                    <>
                      <div className="text-2xl font-bold">¥{monthlyChange.currentAsset.toLocaleString()}</div>
                      <p className="text-xs text-white/80">
                        前月比 {monthlyChange.change >= 0 ? "+" : ""}
                        {monthlyChange.change.toLocaleString()}円
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
              <Card className="bg-blue-500 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">今月の収入</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">¥596,798</div>
                  <p className="text-xs text-white/80">投資運用益を含む</p>
                </CardContent>
              </Card>
              <Card className="bg-pink-500 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">今月の支出</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">¥184,283</div>
                  <p className="text-xs text-white/80">前月比 -2.3%</p>
                </CardContent>
              </Card>
              <Card className="bg-emerald-500 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">収支差分</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+¥412,515</div>
                  <p className="text-xs text-white/80">投資運用益除く: +¥734,774</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <Tabs defaultValue="overview" className="col-span-3">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">概要</TabsTrigger>
              <TabsTrigger value="income-expenses">収入と支出</TabsTrigger>
              <TabsTrigger value="asset-breakdown">資産内訳</TabsTrigger>
              <TabsTrigger value="investment-activity">投資活動</TabsTrigger>
              <TabsTrigger value="goals-plans">目標と計画</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>資産推移</CardTitle>
                    <div className="text-sm text-muted-foreground">{formatMonthDisplay(currentMonth)}時点</div>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>最近の投資活動</CardTitle>
                    <div className="text-sm text-muted-foreground">{formatMonthDisplay(currentMonth)}</div>
                  </CardHeader>
                  <CardContent>
                    <RecentActivity month={currentMonth} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="income-expenses" className="space-y-4">
              <IncomeExpenses month={currentMonth} />
            </TabsContent>
            <TabsContent value="asset-breakdown" className="space-y-4">
              <AssetBreakdown month={currentMonth} />
            </TabsContent>
            <TabsContent value="investment-activity" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>最近の投資活動</CardTitle>
                  <div className="text-sm text-muted-foreground">{formatMonthDisplay(currentMonth)}</div>
                </CardHeader>
                <CardContent>
                  <RecentActivity month={currentMonth} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="goals-plans" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>投資目標</CardTitle>
                </CardHeader>
                <CardContent>
                  <InvestmentGoals />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
