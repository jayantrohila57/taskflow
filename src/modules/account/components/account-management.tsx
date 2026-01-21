'use client'

import { useState } from 'react'
import {
  type ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { MoreHorizontal, RefreshCw, Search } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Account {
  id: string
  user: {
    name?: string
    email?: string
  }
  provider: string
  type: string
  expires_at?: number
}

export function AccountsManagement() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isLoading, setIsLoading] = useState(false)
  const [accounts] = useState<Account[]>([
    {
      id: '1',
      user: {
        name: 'John Doe',
        email: 'john@example.com',
      },
      provider: 'google',
      type: 'oauth',
      expires_at: Date.now() / 1000 + 86400,
    },
  ])

  const columnHelper = createColumnHelper<Account>()

  const refetch = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const columns = [
    columnHelper.accessor('user.name', {
      header: 'User',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.user?.name || 'Unknown'}</div>
          <div className="text-muted-foreground text-sm">{row.original.user?.email || ''}</div>
        </div>
      ),
    }),
    columnHelper.accessor('provider', {
      header: 'Provider',
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
      header: 'Type',
      cell: ({ row }) => row.original.type,
    }),
    columnHelper.accessor('expires_at', {
      header: 'Expires At',
      cell: ({ row }) => {
        if (!row.original.expires_at) return 'Never'
        const expiresAt = new Date(row.original.expires_at * 1000)
        return expiresAt.toLocaleDateString()
      },
    }),
    columnHelper.display({
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">{'Open menu'}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>
              {'Copy ID'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
  ]

  const table = useReactTable({
    data: accounts,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            placeholder="Search accounts"
            className="pl-8"
            value={(table.getColumn('user.name')?.getFilterValue() as string) ?? ''}
            onChange={(e) => table.getColumn('user.name')?.setFilterValue(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={refetch}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
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
                    {isLoading ? 'Loading...' : 'No accounts found'}
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
        </CardContent>
      </Card>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'Previous'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'Next'}
        </Button>
      </div>
    </div>
  )
}
