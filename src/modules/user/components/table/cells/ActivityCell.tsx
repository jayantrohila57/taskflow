import type { Row } from '@tanstack/react-table'
import { format, formatDistanceToNowStrict } from 'date-fns'
import { UserPlus } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { debugError } from '@/lib/utils'
import type { UserTypes } from '../../../validation/user.validation'

// Assuming literals are defined elsewhere
const literals = {
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
    lastLogin: 'Last login',
    joined: 'Joined',
    dateFormat: 'PPP p', // e.g., Jun 21, 2024, 3:45 PM
  },
}

interface ActivityCellProps {
  row: Row<UserTypes['UserWithRole']>
}

// Function to get relative time string or specific format
const formatRelativeTime = (date: Date | null | undefined): string => {
  if (!date) return literals.activity.never
  try {
    // Show relative time for dates within the last 7 days
    if (new Date().getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return formatDistanceToNowStrict(date, { addSuffix: true })
    }
    // Show formatted date for older dates
    return format(date, 'PP') // e.g., Jun 21, 2024
  } catch (error) {
    debugError('Error formatting date:', error)
    return literals.activity.never // Fallback
  }
}

// Function to get precise formatted timestamp
const formatPreciseTime = (date: Date | null | undefined): string => {
  if (!date) return literals.activity.never
  try {
    return format(date, literals.activity.dateFormat)
  } catch (error) {
    debugError('Error formatting date:', error)
    return literals.activity.never // Fallback
  }
}

export function ActivityCell({ row }: ActivityCellProps) {
  const user = row.original
  const lastLogin = user.lastLoginAt ? new Date(user.lastLoginAt) : null
  const createdAt = user.createdAt ? new Date(user.createdAt) : null

  const relativeLastLogin = formatRelativeTime(lastLogin)
  const preciseLastLogin = formatPreciseTime(lastLogin)
  const relativeJoined = formatRelativeTime(createdAt)
  const preciseJoined = formatPreciseTime(createdAt)

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex flex-col space-y-1">
        {/* Last Login */}
        <div className="flex items-center text-sm">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <span className="mr-1 font-medium">
                  {literals.activity.lastLogin}
                  {':'}
                </span>
                <span>{relativeLastLogin}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{preciseLastLogin}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Joined Date */}
        <div className="text-muted-foreground flex items-center text-xs">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                <span className="mr-1 font-medium">
                  {literals.activity.joined}
                  {':'}
                </span>
                <span>{relativeJoined}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{preciseJoined}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
