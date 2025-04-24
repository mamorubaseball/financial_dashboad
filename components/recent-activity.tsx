"use client"

import { CalendarClock, DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import { useMonth } from "@/contexts/month-context"

interface RecentActivityProps {
  month?: string
}

export function RecentActivity({ month }: RecentActivityProps) {
  const { currentMonth } = useMonth()
  const selectedMonth = month || currentMonth

  // 月表示のフォーマット
  const formatMonthDisplay = (monthStr: string) => {
    if (!monthStr) return ""
    const [year, month] = monthStr.split("/")
    return `${year}年${Number.parseInt(month)}月`
  }

  // 選択された月に基づいて表示するデータを変更
  // 実際のアプリケーションでは、APIからデータを取得するなどの処理を行う
  const getActivityData = (month: string) => {
    // 月によって異なるデータを返す例
    if (month === "2025/04") {
      return [
        {
          icon: <CalendarClock className="h-5 w-5 text-violet-600 dark:text-violet-400" />,
          title: "FRBが政策金利を維持",
          date: "4月2日",
          status: "市場変動",
          statusColor: "text-zinc-500 dark:text-zinc-400",
        },
        {
          icon: <TrendingDown className="h-5 w-5 text-rose-600 dark:text-rose-400" />,
          title: "テクノロジーセクターが調整",
          date: "4月中旬",
          status: "影響あり",
          statusColor: "text-rose-500",
        },
        {
          icon: <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
          title: "S&P500インデックスETF購入",
          date: "4月5日",
          status: "¥150,000",
          statusColor: "text-emerald-500",
        },
        {
          icon: <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
          title: "日経平均、39,000円台回復",
          date: "4月26日",
          status: "好影響",
          statusColor: "text-emerald-500",
        },
      ]
    } else if (month === "2025/03") {
      return [
        {
          icon: <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
          title: "米国株式市場が最高値更新",
          date: "3月15日",
          status: "好影響",
          statusColor: "text-emerald-500",
        },
        {
          icon: <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
          title: "全世界株式インデックス購入",
          date: "3月10日",
          status: "¥100,000",
          statusColor: "text-emerald-500",
        },
        {
          icon: <CalendarClock className="h-5 w-5 text-violet-600 dark:text-violet-400" />,
          title: "日銀が金融政策を据え置き",
          date: "3月19日",
          status: "市場安定",
          statusColor: "text-zinc-500 dark:text-zinc-400",
        },
      ]
    } else {
      // デフォルトのデータ
      return [
        {
          icon: <CalendarClock className="h-5 w-5 text-violet-600 dark:text-violet-400" />,
          title: "市場イベント",
          date: `${formatMonthDisplay(month)}中旬`,
          status: "情報なし",
          statusColor: "text-zinc-500 dark:text-zinc-400",
        },
      ]
    }
  }

  const activities = getActivityData(selectedMonth)

  return (
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30">
            {activity.icon}
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.title}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{activity.date}</p>
          </div>
          <div className={`ml-auto font-medium ${activity.statusColor}`}>{activity.status}</div>
        </div>
      ))}
    </div>
  )
}
