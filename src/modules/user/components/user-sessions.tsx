'use client'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { format, formatDistanceToNow } from 'date-fns'
import { Clock, Shield, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRouter } from '@/packages/next-intl/utils/navigation'
import { debugLog } from '@/lib/utils'

// Define a proper type for Session based on Prisma schema
type Session = {
  id: string
  sessionToken: string
  userId: string
  expires: Date
  createdAt: Date
  ipAddress: string | null
  userAgent: string | null
  activatedAt: Date | null
  endedAt: Date | null
  lastActive: Date
  isRevoked: boolean
  revokedAt: Date | null
  revokedReason: string | null
}

// Simple toast implementation to avoid dependency issues
const toast = ({ title, description, variant }: { title: string; description: string; variant?: string }) => {
  debugLog('TOAST', `Toast (${variant || 'default'}): ${title} - ${description}`)
  // In a real implementation, this would show a toast notification
}

interface UserSessionsProps {
  userId: string
  initialSessions: Session[]
}

export function UserSessions({ userId: _userId, initialSessions }: UserSessionsProps) {
  const t = useTranslations('USER_DETAIL.SESSIONS_CARD')
  const router = useRouter()

  // Since the API endpoint may not exist yet, we'll use the initialSessions directly
  const sessions = initialSessions || []

  // Mock function for revoke session since the API endpoint may not exist yet
  const handleRevokeSession = (_sessionId: string) => {
    toast({
      title: t('REVOKE_SUCCESS'),
      description: t('REVOKE_SUCCESS_DESCRIPTION'),
    })
    router.refresh()
  }

  const columnHelper = createColumnHelper<Session>()

  const columns = [
    columnHelper.accessor('userAgent', {
      header: t('DEVICE'),
      cell: ({ row }) => (
        <div>
          <div className="max-w-[300px] truncate text-sm">{row.original.userAgent || t('UNKNOWN_DEVICE')}</div>
          <div className="text-muted-foreground text-sm">{row.original.ipAddress || t('UNKNOWN_IP')}</div>
        </div>
      ),
    }),
    columnHelper.accessor('createdAt', {
      header: t('CREATED'),
      cell: ({ row }) => (
        <div>
          <div className="text-sm">{format(new Date(row.original.createdAt), 'MMM d, yyyy')}</div>
          <div className="text-muted-foreground text-xs">{format(new Date(row.original.createdAt), 'h:mm a')}</div>
        </div>
      ),
    }),
    columnHelper.accessor('lastActive', {
      header: t('LAST_ACTIVE'),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <Clock className="text-muted-foreground h-3 w-3" />
          {formatDistanceToNow(new Date(row.original.lastActive), {
            addSuffix: true,
          })}
        </div>
      ),
    }),
    columnHelper.accessor('isRevoked', {
      header: t('STATUS'),
      cell: ({ row }) => {
        if (row.original.isRevoked) {
          return (
            <Badge
              variant="destructive"
              className="flex items-center gap-1"
            >
              <Shield className="h-3 w-3" /> {t('REVOKED')}
            </Badge>
          )
        } else if (row.original.endedAt) {
          return (
            <Badge
              variant="outline"
              className="flex items-center gap-1"
            >
              <X className="h-3 w-3" /> {t('ENDED')}
            </Badge>
          )
        } else {
          return (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-green-100 text-green-800"
            >
              {t('ACTIVE')}
            </Badge>
          )
        }
      },
    }),
    columnHelper.display({
      id: 'actions',
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleRevokeSession(row.original.id)}
          disabled={row.original.isRevoked}
          className={row.original.isRevoked ? 'text-muted-foreground' : 'text-destructive'}
        >
          {t('REVOKE')}
        </Button>
      ),
    }),
  ]

  const table = useReactTable({
    data: sessions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                {t('NO_SESSIONS')}
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
