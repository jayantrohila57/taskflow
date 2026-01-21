'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { organizationTypes } from './data-table.config'
import { type Organization } from './data-table.schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Link } from '@/packages/next-intl/utils/navigation'

export const columns: ColumnDef<Organization>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'organizationImage',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Image"
      />
    ),
    cell: ({ row }) => {
      const imageUrl = row.getValue('organizationImage')
      return (
        <div className="w-[40px]">
          <Avatar>
            <AvatarImage
              src={imageUrl as string}
              alt="Organization"
              className="h-10 w-10 rounded object-cover"
            />
            <AvatarFallback>{'ORG'}</AvatarFallback>
          </Avatar>
        </div>
      )
    },
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Organization ID"
      />
    ),
    cell: ({ row }) => {
      return (
        <Link href={`/organizations/list/${row.original.id}`}>
          <Button
            asChild
            variant={'link'}
            className="flex space-x-2"
          >
            <span className="max-w-[500px] truncate font-medium">{row.getValue('id')}</span>
          </Button>
        </Link>
      )
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Organization Name"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{row.getValue('name')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Type"
      />
    ),
    cell: ({ row }) => {
      const type = organizationTypes.find((type) => type.value === row.getValue('type'))

      if (!type) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {type.icon && <type.icon className="text-muted-foreground mr-2 h-4 w-4" />}
          <span>{type.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) ?? ''
      return (value as string[]).includes(rowValue as string)
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Organization Website"
      />
    ),
    cell: ({ row }) => <div className="w-[200px]">{row.getValue('description')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Created At"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      return <div className="w-[120px]">{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Updated At"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('updatedAt'))
      return <div className="w-[120px]">{date.toLocaleDateString()}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
