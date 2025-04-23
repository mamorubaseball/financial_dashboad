"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

const incomeData = [
  { name: "会社収入", value: 902389 },
  { name: "投資運用益", value: -322259 },
  { name: "副業", value: 16668 },
]

const expenseData = [
  { name: "家賃", value: 85456 },
  { name: "ジム費", value: 10680 },
  { name: "奨学金", value: 11325 },
  { name: "通信費", value: 3280 },
  { name: "光熱費", value: 12000 },
  { name: "サブスク", value: 1690 },
  { name: "食費+その他", value: 59852 },
]

export function IncomeExpenses() {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>収入内訳</CardTitle>
            <CardDescription>2025年4月</CardDescription>
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
                  <TableRow>
                    <TableCell>会社収入（ボーナス含む）</TableCell>
                    <TableCell className="text-right font-medium">902,389</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>投資運用益（前月比評価損益）</TableCell>
                    <TableCell className="text-right font-medium text-rose-500">-322,259</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>副業</TableCell>
                    <TableCell className="text-right font-medium">16,668</TableCell>
                  </TableRow>
                  <TableRow className="border-t-2">
                    <TableCell className="font-bold">収入合計</TableCell>
                    <TableCell className="text-right font-bold">596,798</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                <p>
                  投資運用益を除いた実現収支: <span className="text-emerald-500 font-medium">+¥734,774</span>
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
            <CardDescription>2025年4月</CardDescription>
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
                  <TableRow>
                    <TableCell>家賃</TableCell>
                    <TableCell className="text-right font-medium">85,456</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ジム費</TableCell>
                    <TableCell className="text-right font-medium">10,680</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>奨学金</TableCell>
                    <TableCell className="text-right font-medium">11,325</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>通信費</TableCell>
                    <TableCell className="text-right font-medium">3,280</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>光熱費</TableCell>
                    <TableCell className="text-right font-medium">12,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>サブスク</TableCell>
                    <TableCell className="text-right font-medium">1,690</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>食費+その他</TableCell>
                    <TableCell className="text-right font-medium">59,852</TableCell>
                  </TableRow>
                  <TableRow className="border-t-2">
                    <TableCell className="font-bold">支出合計</TableCell>
                    <TableCell className="text-right font-bold">184,283</TableCell>
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
