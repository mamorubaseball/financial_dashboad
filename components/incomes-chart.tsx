"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { Income } from "@/lib/types"

export function IncomesChart() {
  const [data, setData] = useState<Income[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/incomes")
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        const result = await response.json()
        setData(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        console.error("Failed to fetch incomes:", err)
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
        収入: {
          label: "収入",
          color: "#818CF8", // インディゴ
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
  )
}
