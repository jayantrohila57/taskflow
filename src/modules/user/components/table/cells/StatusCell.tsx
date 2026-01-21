import type { Row } from '@tanstack/react-table'
import { AlertCircle, Archive, CheckCircle, Clock, HelpCircle, Lock, Trash2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { UserTypes } from '../../../validation/user.validation'

interface StatusCellProps {
  row: Row<UserTypes['UserWithRole']>
}

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
    unknown: 'Unknown',
  },
}

// Mapping from status ID to style and icon
const statusStyles: Record<
  number,
  {
    variant: 'default' | 'secondary' | 'destructive' | 'outline'
    Icon: React.ElementType
  }
> = {
  1: { variant: 'default', Icon: CheckCircle }, // Active
  2: { variant: 'secondary', Icon: Clock }, // Inactive
  3: { variant: 'destructive', Icon: AlertCircle }, // Suspended
  4: { variant: 'destructive', Icon: Lock }, // Locked
  5: { variant: 'outline', Icon: Clock }, // Pending
  6: { variant: 'destructive', Icon: Trash2 }, // Deleted
  7: { variant: 'outline', Icon: Archive }, // Archived
}

export function StatusCell({ row }: StatusCellProps) {
  const statusId = row.original.statusId
  // Ensure statusId is treated as a number for indexing
  const numericStatusId = typeof statusId === 'string' ? parseInt(statusId, 10) : statusId

  const statusInfo = numericStatusId != null ? statusStyles[numericStatusId] : null
  const statusText = numericStatusId != null ? literals.status[getStatusKey(numericStatusId)] : literals.status.unknown
  const Icon = statusInfo?.Icon ?? HelpCircle // Default to HelpCircle if status is unknown

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant={statusInfo?.variant ?? 'secondary'} // Default to secondary if status is unknown
            className="capitalize"
          >
            <Icon className="mr-1 h-3.5 w-3.5" />
            {statusText}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{statusText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Helper function to get the status key from the ID
function getStatusKey(id: number): keyof typeof literals.status {
  switch (id) {
    case 1:
      return 'active'
    case 2:
      return 'inactive'
    case 3:
      return 'suspended'
    case 4:
      return 'locked'
    case 5:
      return 'pending'
    case 6:
      return 'deleted'
    case 7:
      return 'archived'
    default:
      return 'unknown'
  }
}
