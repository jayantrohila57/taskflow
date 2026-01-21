'use client'

import * as React from 'react'
import { type Row } from '@tanstack/react-table'
import { Archive, Copy, Edit, Eye, MoreHorizontal, Share2, Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ProjectTypes } from '@/modules/project/validation/project.validation'
import { debugLog } from '@/lib/utils'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const t = useTranslations()
  const project = row.original as ProjectTypes['Project']
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [showArchiveDialog, setShowArchiveDialog] = React.useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">{t('COMMON.OPEN_MENU')}</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[160px]"
        >
          <DropdownMenuItem>
            <Eye className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            {t('COMMON.VIEW')}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            {t('COMMON.EDIT')}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share2 className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            {t('COMMON.SHARE')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Copy className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            {t('COMMON.DUPLICATE')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowArchiveDialog(true)}>
            <Archive className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            {t('COMMON.ARCHIVE')}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash className="text-destructive mr-2 h-3.5 w-3.5" />
            {t('COMMON.DELETE')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('COMMON.DELETE_PROJECT')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.rich('COMMON.DELETE_PROJECT_CONFIRM', {
                strong: (chunks) => <strong>{chunks}</strong>,
                name: project?.id || t('COMMON.THIS_PROJECT'),
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('COMMON.CANCEL')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                // Add delete project logic here
                debugLog('Delete project:', project.id)
              }}
            >
              {t('COMMON.DELETE')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showArchiveDialog}
        onOpenChange={setShowArchiveDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('COMMON.ARCHIVE_PROJECT')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.rich('COMMON.ARCHIVE_PROJECT_CONFIRM', {
                strong: (chunks) => <strong>{chunks}</strong>,
                name: project.name || t('COMMON.THIS_PROJECT'),
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('COMMON.CANCEL')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                // Add archive project logic here
                debugLog('Archive project:', project.id)
              }}
            >
              {t('COMMON.ARCHIVE')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
