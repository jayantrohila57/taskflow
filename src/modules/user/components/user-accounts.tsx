'use client'

// Import prisma-related types
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Define a proper type for Account based on Prisma schema
type Account = {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string | null
  access_token: string | null
  expires_at: number | null
  token_type: string | null
  scope: string | null
  id_token: string | null
  session_state: string | null
}

interface UserAccountsProps {
  userId: string
  initialAccounts: Account[]
}

export function UserAccounts({ userId: _userId, initialAccounts }: UserAccountsProps) {
  const t = useTranslations('USER_DETAIL.ACCOUNTS_CARD')

  // Since the API endpoint may not exist yet, we'll use the initialAccounts directly
  const accounts = initialAccounts || []

  const columnHelper = createColumnHelper<Account>()

  const columns = [
    columnHelper.accessor('provider', {
      header: t('PROVIDER'),
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="capitalize"
        >
          {row.original.provider}
        </Badge>
      ),
    }),
    columnHelper.accessor('type', {
      header: t('TYPE'),
      cell: ({ row }) => row.original.type,
    }),
    columnHelper.accessor('providerAccountId', {
      header: t('PROVIDER_ACCOUNT_ID'),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-mono text-xs">{row.original.providerAccountId}</div>
      ),
    }),
    columnHelper.accessor('expires_at', {
      header: t('EXPIRES_AT'),
      cell: ({ row }) => {
        if (!row.original.expires_at) return t('NEVER')
        const expiresAt = new Date(row.original.expires_at * 1000)
        return format(expiresAt, 'PPp')
      },
    }),
    columnHelper.display({
      id: 'actions',
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigator.clipboard.writeText(row.original.id)}
        >
          {t('COPY_ID')}
        </Button>
      ),
    }),
  ]

  const table = useReactTable({
    data: accounts,
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
                {t('NO_ACCOUNTS')}
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
