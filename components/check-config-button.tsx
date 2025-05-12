"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export function CheckConfigButton() {
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function checkConfig() {
    setIsChecking(true)
    try {
      const response = await fetch("/api/check-config")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={checkConfig}>
          <Settings className="mr-2 h-4 w-4" />
          設定を確認
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>環境変数の設定状況</DialogTitle>
          <DialogDescription>Google Sheets APIとの連携に必要な環境変数の設定状況を確認します。</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {isChecking ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : result ? (
            <>
              {result.status === "ok" ? (
                <Alert className="border-green-500 bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertTitle>設定は正常です</AlertTitle>
                  <AlertDescription>必要な環境変数が正しく設定されています。</AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>設定に問題があります</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5 mt-2">
                      {result.issues?.map((issue: string, i: number) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded p-3">
                  <div className="text-sm font-medium">API Key</div>
                  <div className={`text-sm ${result.apiKeySet ? "text-green-600" : "text-red-600"}`}>
                    {result.apiKeySet ? "設定済み" : "未設定"}
                  </div>
                </div>
                <div className="border rounded p-3">
                  <div className="text-sm font-medium">Spreadsheet ID</div>
                  <div className={`text-sm ${result.spreadsheetIdSet ? "text-green-600" : "text-red-600"}`}>
                    {result.spreadsheetIdSet ? "設定済み" : "未設定"}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              設定を確認するには「設定を確認」ボタンをクリックしてください。
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
