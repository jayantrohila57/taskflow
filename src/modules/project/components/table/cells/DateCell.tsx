'use client'

import { addDays, format, isAfter, isBefore, isToday } from 'date-fns'
import { Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface DateCellProps {
  date: string | Date | null
  type: 'due' | 'start'
}

export function DateCell({ date, type }: DateCellProps) {
  const t = useTranslations()

  if (!date) {
    return (
      <span className="text-muted-foreground text-xs">
        {type === 'due' ? t('COMMON.NO_DUE_DATE') : t('COMMON.NO_START_DATE')}
      </span>
    )
  }

  const dateObj = new Date(date)
  const today = new Date()
  const isOverdue = type === 'due' && isBefore(dateObj, today) && !isToday(dateObj)
  const isUpcoming = type === 'due' && isAfter(dateObj, today) && isBefore(dateObj, addDays(today, 7))

  const getStatusInfo = () => {
    if (isOverdue) {
      return {
        label: t('COMMON.OVERDUE'),
        variant: 'destructive' as const,
      }
    }
    if (isToday(dateObj)) {
      return {
        label: t('COMMON.TODAY'),
        variant: 'default' as const,
      }
    }
    if (isUpcoming) {
      return {
        label: t('COMMON.UPCOMING'),
        variant: 'warning' as const,
      }
    }
    return {
      label: format(dateObj, 'MMM d, yyyy'),
      variant: 'outline' as const,
    }
  }

  const { label, variant } = getStatusInfo()
  const formattedDate = format(dateObj, 'PPP')
  const timeAgo = type === 'start' ? t('COMMON.STARTED') : t('COMMON.DUE')

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5">
            <Calendar className="text-muted-foreground h-3.5 w-3.5" />
            <Badge
              variant={variant as 'default'}
              className={cn('px-1.5 font-normal', isOverdue && 'text-destructive font-medium')}
            >
              {label}
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>
            {timeAgo}
            {':'} {formattedDate}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
