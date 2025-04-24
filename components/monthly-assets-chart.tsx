"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { MonthlyAsset } from "@/lib/types"

export function MonthlyAssetsChart() {
  const [data, setData] = useState<MonthlyAsset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/monthly-assets")
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        const result = await response.json()
        setData(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        console.error("Failed to fetch monthly assets:", err)
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
        資産額: {
          label: "資産額",
          color: "hsl(265, 89%, 78%)", // パステルパープル
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C084FC" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#C084FC" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              const date = new Date(value)
              return `${date.getFullYear().toString().slice(2)}/${(date.getMonth() + 1).toString().padStart(2, "0")}`
            }}
            tickMargin={10}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `¥${(value / 10000).toFixed(0)}万`}
            tickMargin={10}
          />
          <Tooltip content={<ChartTooltipContent formatValue={(value) => `¥${value.toLocaleString()}`} />} />
          <Area
            type="monotone"
            dataKey="資産額"
            stroke="#C084FC"
            fill="url(#colorAssets)"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
