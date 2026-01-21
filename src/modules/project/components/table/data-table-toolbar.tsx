'use client'

import { type Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { categories, priorities, statuses } from './data-table.config'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const t = useTranslations()
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex flex-col justify-between gap-2 sm:flex-row">
      <div className="flex flex-1 flex-col items-start gap-2 sm:flex-row">
        <div className="relative w-full sm:w-64">
          <Input
            placeholder={t('COMMON.SEARCH')}
            value={(table.getColumn('project')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('project')?.setFilterValue(event.target.value)}
            className="h-8 pr-9"
          />
          {(table.getColumn('project')?.getFilterValue() as string) && (
            <X
              className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 cursor-pointer opacity-50 hover:opacity-100"
              onClick={() => table.getColumn('project')?.setFilterValue('')}
            />
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title={t('COMMON.STATUS')}
              options={statuses}
            />
          )}
          {table.getColumn('priority') && (
            <DataTableFacetedFilter
              column={table.getColumn('priority')}
              title={t('COMMON.PRIORITY')}
              options={priorities}
            />
          )}
          {table.getColumn('category') && (
            <DataTableFacetedFilter
              column={table.getColumn('category')}
              title={t('COMMON.CATEGORY')}
              options={categories}
            />
          )}
          {/* {table.getColumn('projectType') && (
            <DataTableFacetedFilter
              column={table?.getColumn('projectType')}
              title={t('COMMON.TYPE')}
              options={projectTypes}
            />
          )} */}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              {t('COMMON.RESET')}
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
