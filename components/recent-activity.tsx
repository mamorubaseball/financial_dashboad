import { CalendarClock, DollarSign, TrendingDown, TrendingUp } from "lucide-react"

export function RecentActivity() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30">
          <CalendarClock className="h-5 w-5 text-violet-600 dark:text-violet-400" />
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">FRBが政策金利を維持</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">4月2日</p>
        </div>
        <div className="ml-auto font-medium text-zinc-500 dark:text-zinc-400">市場変動</div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30">
          <TrendingDown className="h-5 w-5 text-rose-600 dark:text-rose-400" />
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">テクノロジーセクターが調整</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">4月中旬</p>
        </div>
        <div className="ml-auto font-medium text-rose-500">影響あり</div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">S&P500インデックスETF購入</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">4月5日</p>
        </div>
        <div className="ml-auto font-medium text-emerald-500">¥150,000</div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">日経平均、39,000円台回復</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">4月26日</p>
        </div>
        <div className="ml-auto font-medium text-emerald-500">好影響</div>
      </div>
    </div>
  )
}
