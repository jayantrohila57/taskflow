'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import type { ProjectTypes } from '../../validation/project.validation'

// Import the cell components
import { CategoryCell } from './cells/CategoryCell'
import { DateCell } from './cells/DateCell'
import { IdCell } from './cells/IdCell'
import { OwnerCell } from './cells/OwnerCell'
import { PriorityCell } from './cells/PriorityCell'
import { ProjectCell } from './cells/ProjectCell'
import { StatusCell } from './cells/StatusCell'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

// Literals definitions
const literals = {
  status: {
    active: 'Active',
    inactive: 'Inactive',
    completed: 'Completed',
    onHold: 'On Hold',
    canceled: 'Canceled',
    pending: 'Pending',
  },
  project: {
    unknown: 'Unknown',
    system: 'System',
    fallback: 'P',
  },
  priority: {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
    noPriority: 'No Priority',
  },
  category: {
    noCategory: 'No Category',
  },
  dates: {
    noDueDate: 'No due date',
    noStartDate: 'No start date',
    today: 'Today',
    yesterday: 'Yesterday',
    daysAgo: (days: number) => `${days} days ago`,
    daysLeft: (days: number) => `${days} days left`,
    overdue: 'Overdue',
  },
  owner: {
    noOwner: 'No Owner',
  },
  team: {
    noMembers: 'No Team Members',
    single: 'Member',
    multiple: 'Members',
    viewDetails: 'View Details',
  },
  table: {
    selectAll: 'Select all',
    selectRow: 'Select row',
    columns: {
      id: 'ID',
      project: 'Project',
      status: 'Status',
      priority: 'Priority',
      category: 'Category',
      dueDate: 'Due Date',
      startDate: 'Start Date',
      owner: 'Owner',
      team: 'Team',
    },
  },
}

export const columns: ColumnDef<ProjectTypes['Project']>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() ? 'indeterminate' : false)}
        onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
        aria-label={literals.table.selectAll}
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label={literals.table.selectRow}
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 70,
    minSize: 70,
    maxSize: 70,
  },
  {
    accessorKey: 'project',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={literals.table.columns.project}
      />
    ),
    cell: ({ row }) => <ProjectCell row={row} />,
    enableSorting: true,
    size: 420,
    minSize: 350,
    maxSize: 630,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={literals.table.columns.status}
      />
    ),
    cell: ({ row }) => <StatusCell row={row} />,
    filterFn: (row, id, value): boolean => {
      const statusId = row.original.statusId
      return Array.isArray(value) && statusId != null && value.includes(statusId)
    },
    size: 196,
    minSize: 168,
    maxSize: 252,
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={literals.table.columns.priority}
      />
    ),
    cell: ({ row }) => <PriorityCell row={row} />,
    filterFn: (row, value): boolean => {
      const priorityId = row.original.id
      return Array.isArray(value) && priorityId != null && value.includes(priorityId)
    },
    size: 196,
    minSize: 168,
    maxSize: 252,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={literals.table.columns.category}
      />
    ),
    cell: ({ row }) => <CategoryCell row={row} />,
    filterFn: (row, id, value) => {
      const categoryId = row.original.categoryId
      return Array.isArray(value) && categoryId != null && value.includes(categoryId)
    },
    size: 196,
    minSize: 168,
    maxSize: 252,
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={literals.table.columns.dueDate}
      />
    ),
    cell: ({ row }) => (
      <DateCell
        date={row.getValue('dueDate')}
        type="due"
      />
    ),
    size: 196,
    minSize: 168,
    maxSize: 252,
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={literals.table.columns.startDate}
      />
    ),
    cell: ({ row }) => (
      <DateCell
        date={row.getValue('startDate')}
        type="start"
      />
    ),
    size: 196,
    minSize: 168,
    maxSize: 252,
  },
  {
    accessorKey: 'owner',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={literals.table.columns.owner}
      />
    ),
    cell: ({ row }) => <OwnerCell row={row} />,
    size: 294,
    minSize: 252,
    maxSize: 364,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={literals.table.columns.id}
      />
    ),
    cell: ({ row }) => <IdCell id={row.getValue<string>('id')} />,
    size: 196,
    minSize: 168,
    maxSize: 252,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    size: 126,
    minSize: 126,
    maxSize: 126,
    enableSorting: false,
    enableHiding: false,
  },
]
