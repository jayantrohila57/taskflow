'use client'

import { type Row } from '@tanstack/react-table'
import { Code, FileText, Folder, HelpCircle, LayoutDashboard, PieChart } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import type { ProjectTypes } from '@/modules/project/validation/project.validation'

interface CategoryCellProps<TData> {
  row: Row<TData>
}

export function CategoryCell<TData>({ row }: CategoryCellProps<TData>) {
  const t = useTranslations()
  const project = row.original as ProjectTypes['Project']

  const getCategoryInfo = () => {
    switch (project.categoryId) {
      case 'development':
        return {
          label: t('COMMON.DEVELOPMENT'),
          icon: Code,
        }
      case 'design':
        return {
          label: t('COMMON.DESIGN'),
          icon: FileText,
        }
      case 'marketing':
        return {
          label: t('COMMON.MARKETING'),
          icon: PieChart,
        }
      case 'operations':
        return {
          label: t('COMMON.OPERATIONS'),
          icon: LayoutDashboard,
        }
      case 'other':
        return {
          label: t('COMMON.OTHER'),
          icon: Folder,
        }
      default:
        return {
          label: t('COMMON.UNCATEGORIZED'),
          icon: HelpCircle,
        }
    }
  }

  const { label, icon: Icon } = getCategoryInfo()

  return (
    <Badge
      variant="outline"
      className="gap-1 px-1.5 font-normal"
    >
      <Icon className="text-muted-foreground h-3.5 w-3.5" />
      <span>{label}</span>
    </Badge>
  )
}
