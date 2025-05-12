import { fetchCategories } from "@/lib/sheets"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export async function CategoriesTable() {
  try {
    const data = await fetchCategories()

    if (!data || data.length === 0) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>データが見つかりません</AlertTitle>
          <AlertDescription>カテゴリーデータが存在しないか、アクセス権限がありません。</AlertDescription>
        </Alert>
      )
    }

    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>名前</TableHead>
              <TableHead>タイプ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Badge variant={item.type === "income" ? "default" : "secondary"}>
                    {item.type === "income" ? "収入" : "支出"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  } catch (error) {
    console.error("Error in CategoriesTable:", error)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>データの取得に失敗しました</AlertTitle>
        <AlertDescription>
          カテゴリーデータの取得中にエラーが発生しました。
          {error instanceof Error && <div className="mt-2 text-sm bg-red-50 p-2 rounded">エラー: {error.message}</div>}
        </AlertDescription>
      </Alert>
    )
  }
}
