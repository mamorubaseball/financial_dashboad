"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { fetchMonthlyAssets } from "@/lib/sheets"
import { useMonth } from "@/contexts/month-context"

export function Overview() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { currentMonth } = useMonth()

  useEffect(() => {
    async function loadData() {
      try {
        const assetsData = await fetchMonthlyAssets()
        setData(assetsData)
      } catch (error) {
        console.error("Failed to load monthly assets data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (isLoading) {
    return <div className="h-[300px] flex items-center justify-center">Loading...</div>
  }

  // 現在の月までのデータのみを表示
  const filteredData = data.filter((item) => item.month <= currentMonth)

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
          data={filteredData}
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
              const [year, month] = value.split("/")
              return `${year.slice(2)}/${month}`
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
