"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { ChartContainer, ChartTooltipContent } from "./ui/chart"

const data = [
  { name: "国内株式", value: 576170, percentage: 11.6 },
  { name: "米国株式", value: 2183833, percentage: 44.1 },
  { name: "投資信託", value: 2027117, percentage: 40.9 },
  { name: "預り金", value: 160000, percentage: 3.2 },
]

const COLORS = ["#8B5CF6", "#06B6D4", "#F472B6", "#10B981"]

export function AssetAllocation() {
  return (
    <ChartContainer
      config={{
        国内株式: {
          label: "国内株式",
          color: COLORS[0],
        },
        米国株式: {
          label: "米国株式",
          color: COLORS[1],
        },
        投資信託: {
          label: "投資信託",
          color: COLORS[2],
        },
        預り金: {
          label: "預り金",
          color: COLORS[3],
        },
      }}
      className="h-[300px]"
    >
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
