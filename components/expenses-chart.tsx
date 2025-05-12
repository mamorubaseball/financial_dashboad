"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { Expense } from "@/lib/types"

export function ExpensesChart() {
  const [data, setData] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/expenses")
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        const result = await response.json()
        setData(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        console.error("Failed to fetch expenses:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="h-[300px] flex items-center justify-center">Loading...</div>
  }

  if (error) {
    return <div className="h-[300px] flex items-center justify-center text-red-500">Error: {error}</div>
  }

  if (!data || data.length === 0) {
    return <div className="h-[300px] flex items-center justify-center">No data available</div>
  }

  return (
    <ChartContainer
      config={{
        支出: {
          label: "支出",
          color: "#F472B6", // ピンク
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
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
  )
}
