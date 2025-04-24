"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchIncomes, fetchExpenses } from "@/lib/sheets"
import { useMonth } from "@/contexts/month-context"
import { Skeleton } from "@/components/ui/skeleton"

interface IncomeExpensesProps {
  month?: string
}

export function IncomeExpenses({ month }: IncomeExpensesProps) {
  const { currentMonth } = useMonth()
  const selectedMonth = month || currentMonth

  const [incomeData, setIncomeData] = useState([])
  const [expenseData, setExpenseData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const [incomesData, expensesData] = await Promise.all([
          fetchIncomes(selectedMonth),
          fetchExpenses(selectedMonth),
        ])
        setIncomeData(incomesData)
        setExpenseData(expensesData)
      } catch (error) {
        console.error("Failed to load income/expense data:", error)
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
      <div className="space-y-6">
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>収入内訳</CardTitle>
              <Skeleton className="h-4 w-24 mt-1" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-[300px]" />
              <div className="flex flex-col justify-center">
                <Skeleton className="h-[200px]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>支出内訳</CardTitle>
              <Skeleton className="h-4 w-24 mt-1" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-[300px]" />
              <div className="flex flex-col justify-center">
                <Skeleton className="h-[200px]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 収入合計を計算
  const incomeTotal = incomeData.reduce((sum, item) => sum + item.value, 0)
  // 実現収支（投資運用益を除く）を計算
  const realizedIncome = incomeData
    .filter((item) => item.name !== "投資運用益")
    .reduce((sum, item) => sum + item.value, 0)
  // 支出合計を計算
  const expenseTotal = expenseData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>収入内訳</CardTitle>
            <CardDescription>{formatMonthDisplay(selectedMonth)}</CardDescription>
          </div>
          <div className="ml-auto w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="8 12 12 16 16 12" />
              <line x1="12" y1="8" x2="12" y2="16" />
            </svg>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  収入: {
                    label: "収入",
                    color: "#818CF8", // インディゴ
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeData}>
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `¥${Math.abs(value / 10000).toFixed(0)}万`}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatValue={(value) => `¥${value.toLocaleString()}`}
                          formatLabel={(label) => label}
                        />
                      }
                    />
                    <Bar
                      dataKey="value"
                      fill="#818CF8"
                      radius={[4, 4, 0, 0]}
                      className={({ value }) => (value < 0 ? "fill-rose-500" : "")}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="flex flex-col justify-center">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>項目</TableHead>
                    <TableHead className="text-right">金額（円）</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomeData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className={`text-right font-medium ${item.value < 0 ? "text-rose-500" : ""}`}>
                        {item.value.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2">
                    <TableCell className="font-bold">収入合計</TableCell>
                    <TableCell className="text-right font-bold">{incomeTotal.toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                <p>
                  投資運用益を除いた実現収支:{" "}
                  <span className="text-emerald-500 font-medium">+¥{realizedIncome.toLocaleString()}</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>支出内訳</CardTitle>
            <CardDescription>{formatMonthDisplay(selectedMonth)}</CardDescription>
          </div>
          <div className="ml-auto w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-rose-600"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="16 12 12 8 8 12" />
              <line x1="12" y1="16" x2="12" y2="8" />
            </svg>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  支出: {
                    label: "支出",
                    color: "#F472B6", // ピンク
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expenseData} layout="vertical">
                    <XAxis type="number" tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatValue={(value) => `¥${value.toLocaleString()}`}
                          formatLabel={(label) => label}
                        />
                      }
                    />
                    <Bar dataKey="value" fill="#F472B6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="flex flex-col justify-center">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>項目</TableHead>
                    <TableHead className="text-right">金額（円）</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right font-medium">{item.value.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2">
                    <TableCell className="font-bold">支出合計</TableCell>
                    <TableCell className="text-right font-bold">{expenseTotal.toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
