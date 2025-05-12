import { fetchMonthlyAssets } from "@/lib/sheets"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export async function MonthlyAssetsTable() {
  try {
    const data = await fetchMonthlyAssets()

    if (!data || data.length === 0) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>データが見つかりません</AlertTitle>
          <AlertDescription>月次資産データが存在しないか、アクセス権限がありません。</AlertDescription>
        </Alert>
      )
    }

    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>月</TableHead>
              <TableHead className="text-right">資産額</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{formatMonth(item.month)}</TableCell>
                <TableCell className="text-right">¥{item.資産額.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  } catch (error) {
    console.error("Error in MonthlyAssetsTable:", error)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>データの取得に失敗しました</AlertTitle>
        <AlertDescription>
          月次資産データの取得中にエラーが発生しました。
          {error instanceof Error && <div className="mt-2 text-sm bg-red-50 p-2 rounded">エラー: {error.message}</div>}
        </AlertDescription>
      </Alert>
    )
  }
}

function formatMonth(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    return `${date.getFullYear()}年${date.getMonth() + 1}月`
  } catch (e) {
    return dateStr
  }
}
