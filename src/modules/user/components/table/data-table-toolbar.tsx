'use client'

// React
import { useEffect, useState } from 'react'
// External Libraries
import { type Table } from '@tanstack/react-table'
import { PlusCircle, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Internal Aliased Paths (@/)
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { debugLog } from '@/lib/utils'

import { roles, userStatuses, verificationStatus } from './data-table.config'
// Relative Paths (./)
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'

// Simple debounce hook implementation
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const t = useTranslations()

  const [globalFilter, setGlobalFilter] = useState('')
  const debouncedGlobalFilter = useDebounce(globalFilter, 500)

  useEffect(() => {
    table.setGlobalFilter(debouncedGlobalFilter)
  }, [debouncedGlobalFilter, table])

  const handleCreateUser = () => {
    debugLog('Create user button clicked')
    // Implement user creation logic/navigation here
  }

  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Search users (name, email)..."
          value={globalFilter ?? ''}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="h-9 w-[200px] lg:w-[280px]"
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={userStatuses}
          />
        )}
        {table.getColumn('role') && (
          <DataTableFacetedFilter
            column={table.getColumn('role')}
            title="Role"
            options={roles}
          />
        )}
        {table.getColumn('security') && (
          <DataTableFacetedFilter
            column={table.getColumn('security')}
            title="Verification"
            options={verificationStatus}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters()
              table.resetGlobalFilter()
              setGlobalFilter('')
            }}
            className="h-9 px-2 lg:px-3"
          >
            {t('COMMON.RESET')}
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={handleCreateUser}
          size="sm"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {'Create User'}
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
