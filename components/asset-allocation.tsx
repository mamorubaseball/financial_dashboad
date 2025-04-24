"use client"

import { useEffect, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { fetchAssetAllocations } from "@/lib/sheets"
import { useMonth } from "@/contexts/month-context"

const COLORS = ["#9333EA", "#EC4899", "#06B6D4", "#10B981"]

interface AssetAllocationProps {
  month?: string
}

export function AssetAllocation({ month }: AssetAllocationProps) {
  const { currentMonth } = useMonth()
  const selectedMonth = month || currentMonth

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const allocationsData = await fetchAssetAllocations(selectedMonth)
        setData(allocationsData)
      } catch (error) {
        console.error("Failed to load asset allocations data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (selectedMonth) {
      loadData()
    }
  }, [selectedMonth])

  if (isLoading) {
    return <div className="h-[300px] flex items-center justify-center">Loading...</div>
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
    <div className="h-[300px]">
      <ChartContainer config={colorConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
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
    </div>
  )
}
