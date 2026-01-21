'use client'

import { type Row } from '@tanstack/react-table'
import { CheckCircle, Circle, CircleOff, HelpCircle, Timer } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import type { ProjectTypes } from '@/modules/project/validation/project.validation'

interface StatusCellProps<TData> {
  row: Row<TData>
}

export function StatusCell<TData>({ row }: StatusCellProps<TData>) {
  const t = useTranslations()
  const project = row.original as ProjectTypes['Project']

  const getStatusInfo = () => {
    switch (project.statusId) {
      case 'active':
        return {
          label: t('COMMON.ACTIVE'),
          icon: Circle,
          variant: 'default' as const,
        }
      case 'completed':
        return {
          label: t('COMMON.COMPLETED'),
          icon: CheckCircle,
          variant: 'success' as const,
        }
      case 'on_hold':
        return {
          label: t('COMMON.ON_HOLD'),
          icon: Timer,
          variant: 'secondary' as const,
        }
      case 'canceled':
        return {
          label: t('COMMON.CANCELED'),
          icon: CircleOff,
          variant: 'destructive' as const,
        }
      case 'pending':
        return {
          label: t('COMMON.PENDING'),
          icon: HelpCircle,
          variant: 'outline' as const,
        }
      default:
        return {
          label: t('COMMON.UNKNOWN'),
          icon: HelpCircle,
          variant: 'outline' as const,
        }
    }
  }

  const { label, icon: Icon, variant } = getStatusInfo()

  return (
    <Badge
      variant={variant as 'default'}
      className="gap-1 px-1.5 font-normal"
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </Badge>
  )
}
