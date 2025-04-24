"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

export function RefreshButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleRefresh() {
    setIsLoading(true)

    try {
      await fetch("/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      // データを再取得するためにページを更新
      router.refresh()
    } catch (error) {
      console.error("Failed to refresh data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
      {isLoading ? (
        <>
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          更新中...
        </>
      ) : (
        <>
          <RefreshCw className="mr-2 h-4 w-4" />
          データを更新
        </>
      )}
    </Button>
  )
}
