'use client'

import { type Row } from '@tanstack/react-table'
import { ArrowDown, ArrowRight, ArrowUp, HelpCircle, Zap } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import type { ProjectTypes } from '@/modules/project/validation/project.validation'

interface PriorityCellProps<TData> {
  row: Row<TData>
}

export function PriorityCell<TData>({ row }: PriorityCellProps<TData>) {
  const t = useTranslations()
  const project = row.original as ProjectTypes['Project']

  const getPriorityInfo = () => {
    switch (project.id) {
      case 'low':
        return {
          label: t('COMMON.LOW'),
          icon: ArrowDown,
          variant: 'outline' as const,
        }
      case 'medium':
        return {
          label: t('COMMON.MEDIUM'),
          icon: ArrowRight,
          variant: 'secondary' as const,
        }
      case 'high':
        return {
          label: t('COMMON.HIGH'),
          icon: ArrowUp,
          variant: 'default' as const,
        }
      case 'urgent':
        return {
          label: t('COMMON.URGENT'),
          icon: Zap,
          variant: 'destructive' as const,
        }
      default:
        return {
          label: t('COMMON.UNKNOWN'),
          icon: HelpCircle,
          variant: 'outline' as const,
        }
    }
  }

  const { label, icon: Icon, variant } = getPriorityInfo()

  return (
    <Badge
      variant={variant}
      className="gap-1 px-1.5 font-normal"
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </Badge>
  )
}
