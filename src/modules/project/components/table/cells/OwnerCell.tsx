'use client'

import { type Row } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { ProjectTypes } from '@/modules/project/validation/project.validation'
import { Link } from '@/packages/next-intl/utils/navigation'

interface OwnerCellProps<TData> {
  row: Row<TData>
}

interface ProjectOwner {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export function OwnerCell<TData>({ row }: OwnerCellProps<TData>) {
  const t = useTranslations()
  const project = row.original as ProjectTypes['Project'] & {
    owner?: ProjectOwner
  }

  if (!project.owner) {
    return <span className="text-muted-foreground text-xs">{t('COMMON.UNKNOWN')}</span>
  }

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-6 w-6">
        {project.owner.image ? (
          <AvatarImage
            src={project.owner.image}
            alt={project.owner.name || 'User'}
          />
        ) : (
          <AvatarFallback className="text-xs">{project.owner.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
        )}
      </Avatar>
      <div className="flex flex-col">
        <Link
          href={`/users/${project.owner.id}`}
          className="text-sm font-medium hover:underline"
        >
          {project.owner.name || t('COMMON.UNKNOWN')}
        </Link>
        {project.owner.email && <span className="text-muted-foreground text-xs">{project.owner.email}</span>}
      </div>
    </div>
  )
}
