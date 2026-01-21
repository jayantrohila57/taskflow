'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { Globe, Moon, Sun } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import type { UserTypes } from '../../validation/user.validation'

// Import the new cell components
import { ActivityCell } from './cells/ActivityCell'
import { IdCell } from './cells/IdCell'
// import { OrganizationsCell } from './cells/OrganizationsCell'
import { PreferencesCell } from './cells/PreferencesCell'
import { RoleCell } from './cells/RoleCell'
import { SecurityCell } from './cells/SecurityCell'
import { StatusCell } from './cells/StatusCell'
import { UserCell } from './cells/UserCell'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

// Keep or remove literals based on where they are defined globally
const literals = {
  status: {
    active: 'Active',
    inactive: 'Inactive',
    suspended: 'Suspended',
    locked: 'Locked',
    pending: 'Pending',
    deleted: 'Deleted',
    archived: 'Archived',
  },
  user: {
    unknown: 'Unknown',
    system: 'System',
    fallback: 'U',
  },
  security: {
    twoFactor: '2FA',
    noTwoFactor: 'No 2FA',
    verified: 'Verified',
    unverified: 'Unverified',
    attempts: (count: number) => `${count} failed ${count === 1 ? 'attempt' : 'attempts'}`,
  },
  role: {
    noRole: 'No Role',
  },
  preferences: {
    timezone: 'UTC',
    languages: {
      en: { label: 'English', icon: '🇺🇸' },
      es: { label: 'Spanish', icon: '🇪🇸' },
      fr: { label: 'French', icon: '🇫🇷' },
      de: { label: 'German', icon: '🇩🇪' },
      zh: { label: 'Chinese', icon: '🇨🇳' },
      ja: { label: 'Japanese', icon: '🇯🇵' },
      default: { label: 'Default', icon: '🌐' },
    },
    themes: {
      light: { label: 'Light', icon: Sun },
      dark: { label: 'Dark', icon: Moon },
      system: { label: 'System', icon: Globe },
      default: { label: 'Default', icon: Sun },
    },
  },
  activity: {
    never: 'Never',
    today: 'Today',
    yesterday: 'Yesterday',
    daysAgo: (days: number) => `${days} days ago`,
    weeksAgo: (weeks: number) => `${weeks} weeks ago`,
    status: {
      neverLoggedIn: 'Never logged in',
      activeToday: 'Active today',
      activeRecently: 'Active recently',
      inactive: 'Inactive',
      dormant: 'Dormant',
    },
    lastLogin: 'Last login: ',
    joined: 'Joined: ',
  },
  organizations: {
    none: 'No Organizations',
    single: 'Organization',
    multiple: 'Organizations',
    viewDetails: 'View Details',
  },
  table: {
    selectAll: 'Select all',
    selectRow: 'Select row',
    columns: {
      id: 'ID',
      user: 'User',
      status: 'Status',
      security: 'Security',
      role: 'Role',
      preferences: 'Preferences',
      activity: 'Activity',
      organizations: 'Organizations',
    },
  },
}

export const columns: ColumnDef<UserTypes['UserWithRole']>[] = [
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
    accessorKey: 'user',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={literals.table.columns.user}
      />
    ),
    cell: ({ row }) => <UserCell row={row} />,
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
    accessorKey: 'security',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={literals.table.columns.security}
      />
    ),
    cell: ({ row }) => <SecurityCell row={row} />,
    size: 336,
    minSize: 280,
    maxSize: 420,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Role"
      />
    ),
    cell: ({ row }) => <RoleCell row={row} />,
    filterFn: (row, id, value) => {
      const roleName = row.original.roles?.[0]?.name?.toLowerCase()
      return Array.isArray(value) && roleName != null && value.includes(roleName)
    },
    size: 196,
    minSize: 168,
    maxSize: 252,
  },
  {
    accessorKey: 'preferences',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Preferences"
      />
    ),
    cell: ({ row }) => <PreferencesCell row={row} />,
    size: 336,
    minSize: 280,
    maxSize: 420,
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
    accessorKey: 'activity',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Activity"
      />
    ),
    cell: ({ row }) => <ActivityCell row={row} />,
    size: 294,
    minSize: 252,
    maxSize: 364,
  },
  // {
  //   accessorKey: 'organizations',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Organizations" />,
  //   cell: ({ row }) => <OrganizationsCell orgLength={row.original?.organizationLength ?? 0} />,
  //   size: 294,
  //   minSize: 252,
  //   maxSize: 364,
  // },
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
