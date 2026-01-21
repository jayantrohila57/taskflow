'use client'

import { type Row } from '@tanstack/react-table'
import { Copy, Eye, Lock, Mail, MoreHorizontal, Share2, Trash, UserCog } from 'lucide-react'
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { debugError, debugLog } from '@/lib/utils'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const user = row.original
  const t = useTranslations()

  const handleEdit = () => {
    try {
      debugLog('Edit user:', user)
      // Add edit logic here
    } catch (error) {
      debugError('Error editing user:', error)
    }
  }

  const handleViewDetails = () => {
    try {
      debugLog('View details for user:', user)
      // Add view details logic here
    } catch (error) {
      debugError('Error viewing user details:', error)
    }
  }

  const handleSendMessage = () => {
    try {
      debugLog('Send message to user:', user)
      // Add send message logic here
    } catch (error) {
      debugError('Error sending message:', error)
    }
  }

  const handleResetPassword = () => {
    try {
      debugLog('Reset password for user:', user)
      // Add reset password logic here
    } catch (error) {
      debugError('Error resetting password:', error)
    }
  }

  const handleDuplicate = () => {
    try {
      debugLog('Duplicate user:', user)
      // Add duplicate logic here
    } catch (error) {
      debugError('Error duplicating user:', error)
    }
  }

  const handleShare = () => {
    try {
      debugLog('Share user:', user)
      // Add share logic here
    } catch (error) {
      debugError('Error sharing user:', error)
    }
  }

  const handleDelete = () => {
    try {
      debugLog('Delete user:', user)
      // Add delete logic here
    } catch (error) {
      debugError('Error deleting user:', error)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">{'open menu'}</span>
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[200px]"
          >
            <DropdownMenuItem onClick={handleEdit}>
              <UserCog className="mr-2 h-4 w-4" />
              {t('COMMON.EDIT')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewDetails}>
              <Eye className="mr-2 h-4 w-4" />
              {t('COMMON.VIEW_DETAILS')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSendMessage}>
              <Mail className="mr-2 h-4 w-4" />
              {t('COMMON.SEND_MESSAGE')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleResetPassword}>
              <Lock className="mr-2 h-4 w-4" />
              {t('COMMON.RESET_PASSWORD')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDuplicate}>
              <Copy className="mr-2 h-4 w-4" />
              {t('COMMON.DUPLICATE')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              {t('COMMON.SHARE')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleDelete}
            >
              <Trash className="mr-2 h-4 w-4" />
              {t('COMMON.DELETE')}
              <DropdownMenuShortcut>{'⌘⌫'}</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent>
          <p>{t('COMMON.ACTIONS')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
