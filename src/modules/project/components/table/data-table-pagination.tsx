import * as React from 'react'
import { type Table } from '@tanstack/react-table'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const t = useTranslations()
  const [pageIndex, setPageIndex] = React.useState(table.getState().pagination.pageIndex + 1)

  React.useEffect(() => {
    setPageIndex(table.getState().pagination.pageIndex + 1)
  }, [table])

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8">
      <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} {t('COMMON.OF')} {table.getFilteredRowModel().rows.length}{' '}
        {t('COMMON.ROWS_SELECTED')}
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium whitespace-nowrap">{t('COMMON.ROWS_PER_PAGE')}</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {t('COMMON.PAGE')} {table.getState().pagination.pageIndex + 1} {t('COMMON.OF')} {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">{t('COMMON.GO_TO_FIRST_PAGE')}</span>
            <ChevronFirst className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">{t('COMMON.GO_TO_PREV_PAGE')}</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex h-8 w-32 items-center gap-2 text-sm font-medium">
            <span className="text-muted-foreground">{t('COMMON.PAGE')}</span>
            <input
              type="number"
              value={pageIndex}
              onChange={(e) => {
                const newPageIndex = Number(e.target.value)
                if (newPageIndex > 0 && newPageIndex <= table.getPageCount()) {
                  setPageIndex(newPageIndex)
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  table.setPageIndex(pageIndex - 1)
                }
              }}
              onBlur={() => {
                table.setPageIndex(pageIndex - 1)
              }}
              min={1}
              max={table.getPageCount()}
              className="w-16 rounded border p-0.5 text-center text-base"
            />
            <span className="text-muted-foreground">
              {t('COMMON.OF')} {table.getPageCount()}
            </span>
          </div>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">{t('COMMON.GO_TO_NEXT_PAGE')}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">{t('COMMON.GO_TO_LAST_PAGE')}</span>
            <ChevronLast className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
