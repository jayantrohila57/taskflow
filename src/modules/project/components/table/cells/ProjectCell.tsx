'use client'

import { type Row } from '@tanstack/react-table'
import { Folder } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import type { ProjectTypes } from '@/modules/project/validation/project.validation'
import { Link } from '@/packages/next-intl/utils/navigation'

interface ProjectCellProps<TData> {
  row: Row<TData>
}

export function ProjectCell<TData>({ row }: ProjectCellProps<TData>) {
  const project = row.original as ProjectTypes['Project']

  return (
    <div className="flex items-center">
      <Avatar className="mr-3 h-8 w-8">
        {project.icon ? (
          <AvatarImage
            src={project.icon}
            alt={project.name || 'Project'}
          />
        ) : (
          <AvatarFallback className="bg-primary/10">
            <Folder className="text-primary h-4 w-4" />
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Link
            href={`/projects/${project.id}`}
            className="text-foreground font-medium hover:underline"
          >
            {project.name || 'Untitled Project'}
          </Link>
          {project.isArchived && (
            <Badge
              variant="outline"
              className="h-5 px-1.5 text-xs"
            >
              {'Archived'}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground line-clamp-1 max-w-[300px] text-xs">
            {project.description || 'No description'}
          </span>
        </div>
      </div>
    </div>
  )
}
