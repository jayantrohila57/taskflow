'use client'

import { type Row } from '@tanstack/react-table'
import { Building2, Copy, MoreHorizontal, Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { debugLog } from '@/lib/utils'

import { organizationSchema } from './data-table.schema'
import { Link } from '@/packages/next-intl/utils/navigation'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const org = organizationSchema.parse(row.original)
  debugLog('DATA_TABLE:ORG', org)
  const t = useTranslations()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">{'open menu'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px]"
      >
        <Link href={`/organizations/list/${org.id}/edit`}>
          <DropdownMenuItem>
            <Building2 className="mr-2 h-4 w-4" />
            {t('COMMON.EDIT')}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <Trash className="mr-2 h-4 w-4" />
          {t('COMMON.DELETE')}
          <DropdownMenuShortcut>{'⌘⌫'}</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
