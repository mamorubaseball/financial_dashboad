"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MonthSelectorProps {
  availableMonths: string[]
  currentMonth: string
  onMonthChange: (month: string) => void
}

export function MonthSelector({ availableMonths, currentMonth, onMonthChange }: MonthSelectorProps) {
  const sortedMonths = [...availableMonths].sort((a, b) => {
    // Sort in descending order (newest first)
    return b.localeCompare(a)
  })

  const currentIndex = sortedMonths.findIndex((month) => month === currentMonth)

  const handlePrevious = () => {
    if (currentIndex < sortedMonths.length - 1) {
      onMonthChange(sortedMonths[currentIndex + 1])
    }
  }

  const handleNext = () => {
    if (currentIndex > 0) {
      onMonthChange(sortedMonths[currentIndex - 1])
    }
  }

  const formatMonthDisplay = (monthStr: string) => {
    const [year, month] = monthStr.split("/")
    return `${year}年${Number.parseInt(month)}月`
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={handlePrevious} disabled={currentIndex >= sortedMonths.length - 1}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Select value={currentMonth} onValueChange={onMonthChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue>{formatMonthDisplay(currentMonth)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {sortedMonths.map((month) => (
            <SelectItem key={month} value={month}>
              {formatMonthDisplay(month)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" size="icon" onClick={handleNext} disabled={currentIndex <= 0}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
