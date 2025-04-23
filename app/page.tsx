import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Overview } from "../components/overview"
import { AssetAllocation } from "../components/asset-allocation"
import { RecentActivity } from "../components/recent-activity"
import { InvestmentGoals } from "../components/investment-goals"
import { IncomeExpenses } from "../components/income-expenses"
import { Button } from "../components/ui/button"
import { CalendarIcon, Download, Share2 } from "lucide-react"
import { Progress } from "../components/ui/progress"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      <div className="border-b bg-white/80 backdrop-blur-sm dark:bg-zinc-950/80 sticky top-0 z-10">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
              エンジニア会社員のリアル資産推移レポート
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1 rounded-full">
              <CalendarIcon className="h-3.5 w-3.5" />
              <span>2025年4月</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1 rounded-full">
              <Download className="h-3.5 w-3.5" />
              <span>レポートをダウンロード</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1 rounded-full">
              <Share2 className="h-3.5 w-3.5" />
              <span>共有</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="mb-6 bg-white p-4 rounded-xl shadow-sm dark:bg-zinc-900">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-bold text-lg">2026年末までの目標達成率: 総資産 1,000万円</div>
              <div className="text-sm font-medium">49.5%</div>
            </div>
            <Progress
              value={49.5}
              className="h-3 rounded-full bg-zinc-200 dark:bg-zinc-800"
              indicatorClassName="bg-gradient-to-r from-violet-500 to-fuchsia-500"
            />
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              現在約500万円。月5万円の積立と複利効果で達成を目指す
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-violet-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">総資産額</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥4,953,854</div>
              <p className="text-xs opacity-90">前月比 -¥322,259</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">今月の収入</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥596,798</div>
              <p className="text-xs opacity-90">投資運用益を含む</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-pink-500 to-rose-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">今月の支出</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥184,283</div>
              <p className="text-xs opacity-90">前月比 -2.3%</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">収支差分</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+¥412,515</div>
              <p className="text-xs opacity-90">投資運用益除く: +¥734,774</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-5 rounded-full h-12 bg-zinc-100 dark:bg-zinc-800 p-1">
            <TabsTrigger
              value="overview"
              className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-zinc-950"
            >
              概要
            </TabsTrigger>
            <TabsTrigger
              value="income"
              className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-zinc-950"
            >
              収入と支出
            </TabsTrigger>
            <TabsTrigger
              value="assets"
              className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-zinc-950"
            >
              資産内訳
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-zinc-950"
            >
              投資活動
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-zinc-950"
            >
              目標と計画
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4 border-none shadow-md">
                <CardHeader>
                  <CardTitle>資産推移</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3 border-none shadow-md">
                <CardHeader>
                  <CardTitle>資産配分</CardTitle>
                </CardHeader>
                <CardContent>
                  <AssetAllocation />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4 border-none shadow-md">
                <CardHeader>
                  <CardTitle>最近の投資活動</CardTitle>
                  <CardDescription>2025年4月の投資イベントとニュース</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3 border-none shadow-md">
                <CardHeader>
                  <CardTitle>投資目標</CardTitle>
                  <CardDescription>将来に向けた資産形成計画</CardDescription>
                </CardHeader>
                <CardContent>
                  <InvestmentGoals />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="income" className="mt-6">
            <IncomeExpenses />
          </TabsContent>

          <TabsContent value="assets" className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2 border-none shadow-md">
                <CardHeader>
                  <CardTitle>資産内訳の詳細</CardTitle>
                  <CardDescription>2025年4月時点</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h4 className="mb-4 text-sm font-medium">資産区分別評価額と損益</h4>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <div className="font-medium">国内株式</div>
                          <div className="font-medium">¥576,170</div>
                          <div className="text-rose-500">-¥83,078</div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <div className="font-medium">米国株式</div>
                          <div className="font-medium">¥2,183,833</div>
                          <div className="text-rose-500">-¥293,793</div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <div className="font-medium">投資信託</div>
                          <div className="font-medium">¥2,027,117</div>
                          <div className="text-rose-500">-¥110,133</div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <div className="font-medium">預り金</div>
                          <div className="font-medium">¥160,000</div>
                          <div className="text-emerald-500">+¥159,790</div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4 border-t pt-2">
                          <div className="font-medium">総資産額</div>
                          <div className="font-bold">¥4,953,854</div>
                          <div className="text-rose-500 font-medium">-¥322,259</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>資産配分</CardTitle>
                </CardHeader>
                <CardContent>
                  <AssetAllocation />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>2025年4月の市場環境と対応</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h4 className="mb-4 text-sm font-medium">市場の動き</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-violet-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">米国 FRBが政策金利を維持（4月2日）</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            FRBが政策金利を5.25-5.50%に維持。インフレ懸念は継続するも、年内の利下げ見通しを示唆。株式市場は一時的に上昇後、軟調な展開。
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-violet-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">テクノロジーセクターが調整（4月中旬）</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            大型テック株の四半期決算発表が市場予想を下回り、NASDAQが3週連続で下落。保有する米国株ETFにも影響。
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-violet-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">日経平均、39,000円台回復（4月26日）</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            国内景気の回復期待と円安進行を背景に日経平均が39,000円台を回復。輸出関連株を中心に上昇。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-4 text-sm font-medium">投資対応</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-emerald-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">購入：S&P500インデックスETF（4月5日）</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            金額:
                            150,000円。調整局面を利用して積立額を増額。長期的な米国経済の成長を見据えた投資を継続。
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-emerald-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">四半期ポートフォリオ再調整（4月15日）</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            目標資産配分に合わせて国内株式と米国株式の比率を調整。目標：国内30%、米国50%、新興国20%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-4 text-sm font-medium">注目の経済ニュース</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-amber-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">量的緩和縮小を継続、日銀</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            日銀が金融政策決定会合で国債買い入れ額の段階的縮小を決定
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-amber-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">米中通商協議が再開</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            米中の閣僚級通商協議が2年ぶりに再開、市場は警戒感と期待
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-amber-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">原油価格が再び上昇</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            中東情勢の緊迫化でWTI原油が85ドル台へ上昇、インフレへの影響懸念
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="mt-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>今後の目標と計画</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h4 className="mb-4 text-sm font-medium">資産形成マイルストーン</h4>
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
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          インカムゲインの確保で不労所得の仕組みを構築
                        </div>
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
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          セミリタイアの選択肢を持てる資産形成を目指す
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-4 text-sm font-medium">投資を続ける意義</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-fuchsia-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">長期的な資産形成</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            短期的な市場変動に一喜一憂せず、長期的な視点で資産を育てることが重要。今月は評価損が出ているが、これも資産形成の過程と捉えて継続投資。
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-fuchsia-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">分散投資の実践</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            国内株式、米国株式、投資信託を組み合わせることで、リスクを分散。特定の市場環境に左右されにくいポートフォリオ構築を目指している。
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-fuchsia-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">積立投資の力</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            毎月コツコツと積立投資を行うことで、ドルコスト平均法の恩恵を受け、時間の経過とともに複利効果が発揮される。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-4 text-sm font-medium">今後の行動計画</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                        <div className="font-medium text-sm">積立額の増額</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                          昇給分を活かし、月々の積立額を5万円→7万円に増額予定
                        </div>
                      </div>
                      <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                        <div className="font-medium text-sm">投資先の多様化</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                          新興国ETFや不動産関連の商品を検討し、さらなる分散投資を実現
                        </div>
                      </div>
                      <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                        <div className="font-medium text-sm">NISA枠の活用</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                          新NISAの枠を最大限活用し、非課税メリットを享受
                        </div>
                      </div>
                      <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                        <div className="font-medium text-sm">副業収入の拡大</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                          エンジニアスキルを活かした副業で投資原資を増やす
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
