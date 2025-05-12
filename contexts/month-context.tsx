"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type MonthContextType = {
  currentMonth: string
  availableMonths: string[]
  setCurrentMonth: (month: string) => void
  isLoading: boolean
}

const MonthContext = createContext<MonthContextType | undefined>(undefined)

export function MonthProvider({ children }: { children: ReactNode }) {
  const [currentMonth, setCurrentMonth] = useState<string>("2025/04")
  const [availableMonths, setAvailableMonths] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAvailableMonths() {
      try {
        setIsLoading(true)
        const response = await fetch("/api/available-months")
        if (response.ok) {
          const data = await response.json()

          if (data.months && data.months.length > 0) {
            setAvailableMonths(data.months)

            // 最新の月をデフォルトとして設定
            const sortedMonths = [...data.months].sort((a, b) => b.localeCompare(a))
            setCurrentMonth(sortedMonths[0])
          } else {
            // データがない場合はデフォルト値を設定
            const defaultMonths = ["2025/04", "2025/03", "2025/02", "2025/01", "2024/12"]
            setAvailableMonths(defaultMonths)
            setCurrentMonth("2025/04")
          }
        } else {
          throw new Error(`API returned status: ${response.status}`)
        }
      } catch (error) {
        console.error("Failed to fetch available months:", error)
        // エラー時にはデフォルト値を設定
        const defaultMonths = ["2025/04", "2025/03", "2025/02", "2025/01", "2024/12"]
        setAvailableMonths(defaultMonths)
        setCurrentMonth("2025/04")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailableMonths()
  }, [])

  return (
    <MonthContext.Provider value={{ currentMonth, availableMonths, setCurrentMonth, isLoading }}>
      {children}
    </MonthContext.Provider>
  )
}

export function useMonth() {
  const context = useContext(MonthContext)
  if (context === undefined) {
    throw new Error("useMonth must be used within a MonthProvider")
  }
  return context
}
