import { fetchIncomes } from "@/lib/sheets"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export async function IncomesTable() {
  try {
    const data = await fetchIncomes()

    if (!data || data.length === 0) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>データが見つかりません</AlertTitle>
          <AlertDescription>収入データが存在しないか、アクセス権限がありません。</AlertDescription>
        </Alert>
      )
    }

    // 合計を計算
    const total = data.reduce((sum, item) => sum + item.value, 0)

    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>項目</TableHead>
              <TableHead className="text-right">金額（円）</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell className={`text-right ${item.value < 0 ? "text-red-500" : ""}`}>
                  {item.value.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold">
              <TableCell>合計</TableCell>
              <TableCell className={`text-right ${total < 0 ? "text-red-500" : ""}`}>
                {total.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  } catch (error) {
    console.error("Error in IncomesTable:", error)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>データの取得に失敗しました</AlertTitle>
        <AlertDescription>
          収入データの取得中にエラーが発生しました。
          {error instanceof Error && <div className="mt-2 text-sm bg-red-50 p-2 rounded">エラー: {error.message}</div>}
        </AlertDescription>
      </Alert>
    )
  }
}
