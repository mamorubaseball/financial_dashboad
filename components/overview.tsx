"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltipContent } from "./ui/chart"

const data = [
  {
    month: "2024-11",
    資産額: 4200000,
  },
  {
    month: "2024-12",
    資産額: 4350000,
  },
  {
    month: "2025-01",
    資産額: 4500000,
  },
  {
    month: "2025-02",
    資産額: 4750000,
  },
  {
    month: "2025-03",
    資産額: 5276113,
  },
  {
    month: "2025-04",
    資産額: 4953854,
  },
]

export function Overview() {
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
