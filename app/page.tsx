"use client"
import { MonthProvider } from "@/contexts/month-context"
import { DashboardContent } from "@/components/dashboard-content"

export default function Home() {
  return (
    <MonthProvider>
      <DashboardContent />
    </MonthProvider>
  )
}
