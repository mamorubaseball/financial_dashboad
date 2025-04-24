"use client"

import { useEffect, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { AssetAllocation } from "@/lib/types"

const COLORS = ["#8B5CF6", "#06B6D4", "#F472B6", "#10B981", "#F59E0B", "#EC4899"]

export function AssetAllocationsChart() {
  const [data, setData] = useState<AssetAllocation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/asset-allocations")
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        const result = await response.json()
        setData(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        console.error("Failed to fetch asset allocations:", err)
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

  // 色の設定を動的に生成
  const colorConfig = data.reduce(
    (config, item, index) => {
      config[item.name] = {
        label: item.name,
        color: COLORS[index % COLORS.length],
      }
      return config
    },
    {} as Record<string, { label: string; color: string }>,
  )

  return (
    <ChartContainer config={colorConfig} className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percentage }) => `${name}: ${percentage}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent formatValue={(value) => `¥${value.toLocaleString()}`} />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
