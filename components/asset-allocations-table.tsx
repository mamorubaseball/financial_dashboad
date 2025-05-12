import { fetchAssetAllocations } from "@/lib/sheets"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export async function AssetAllocationsTable() {
  try {
    const data = await fetchAssetAllocations()

    if (!data || data.length === 0) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>データが見つかりません</AlertTitle>
          <AlertDescription>資産配分データが存在しないか、アクセス権限がありません。</AlertDescription>
        </Alert>
      )
    }

    // 合計を計算
    const totalValue = data.reduce((sum, item) => sum + item.value, 0)

    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>資産</TableHead>
              <TableHead className="text-right">金額（円）</TableHead>
              <TableHead className="text-right">割合（%）</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.value.toLocaleString()}</TableCell>
                <TableCell className="text-right">{item.percentage.toFixed(1)}%</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold">
              <TableCell>合計</TableCell>
              <TableCell className="text-right">{totalValue.toLocaleString()}</TableCell>
              <TableCell className="text-right">100.0%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  } catch (error) {
    console.error("Error in AssetAllocationsTable:", error)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>データの取得に失敗しました</AlertTitle>
        <AlertDescription>
          資産配分データの取得中にエラーが発生しました。
          {error instanceof Error && <div className="mt-2 text-sm bg-red-50 p-2 rounded">エラー: {error.message}</div>}
        </AlertDescription>
      </Alert>
    )
  }
}
