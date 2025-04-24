import { Progress } from "@/components/ui/progress"

export function InvestmentGoals() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium">総資産 1,000万円達成</div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">2026年末</div>
        </div>
        <Progress
          value={49.5}
          className="h-2 bg-zinc-200 dark:bg-zinc-800"
          indicatorClassName="bg-gradient-to-r from-violet-500 to-fuchsia-500"
        />
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          現在約500万円。月5万円の積立と複利効果で達成を目指す
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium">配当・分配金 年間10万円</div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">2027年</div>
        </div>
        <Progress
          value={30}
          className="h-2 bg-zinc-200 dark:bg-zinc-800"
          indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-500"
        />
        <div className="text-xs text-zinc-500 dark:text-zinc-400">インカムゲインの確保で不労所得の仕組みを構築</div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium">金融資産 3,000万円達成</div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">2035年</div>
        </div>
        <Progress
          value={16.5}
          className="h-2 bg-zinc-200 dark:bg-zinc-800"
          indicatorClassName="bg-gradient-to-r from-emerald-500 to-teal-500"
        />
        <div className="text-xs text-zinc-500 dark:text-zinc-400">セミリタイアの選択肢を持てる資産形成を目指す</div>
      </div>
    </div>
  )
}
