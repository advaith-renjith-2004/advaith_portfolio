import { formatDateRange } from '@/lib/utils/dates'
import { cn } from '@/lib/utils'

interface CardDateRangeProps {
  startDate: string | null
  endDate: string | null
  className?: string
}

export function CardDateRange({ startDate, endDate, className }: CardDateRangeProps) {
  if (!startDate) return null

  return (
    <div
      className={cn(
        'inline-flex items-center rounded border border-border/50 bg-muted/50 px-2 py-1',
        className
      )}
    >
      <span className="font-mono text-[11px] font-semibold uppercase tracking-tight text-muted-foreground md:text-[12.5px]">
        {formatDateRange(startDate, endDate)}
      </span>
    </div>
  )
}
