import type { Row } from '@tanstack/react-table'
import { ShieldBan, UserCircle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { UserTypes } from '../../../validation/user.validation'

// Assuming literals are defined elsewhere
const literals = {
  role: {
    noRole: 'No Role Assigned',
    systemRole: 'System Role',
  },
}

interface RoleCellProps {
  row: Row<UserTypes['UserWithRole']>
}

export function RoleCell({ row }: RoleCellProps) {
  const roles = row.original.roles
  const primaryRole = roles && roles.length > 0 ? roles[0] : null

  if (!primaryRole) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant="outline"
              className="flex w-fit items-center"
            >
              <ShieldBan className="text-muted-foreground mr-1 h-3.5 w-3.5" />
              <span className="text-muted-foreground">{literals.role.noRole}</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{literals.role.noRole}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  const roleName = primaryRole.name
  const roleDescription = primaryRole.description
  const isSystemRole = primaryRole.isSystem

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant={isSystemRole ? 'secondary' : 'default'}
            className="w-fit capitalize"
          >
            <UserCircle className="mr-1 h-3.5 w-3.5" />
            {roleName}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{roleName}</p>
          {roleDescription && <p className="text-muted-foreground text-sm">{roleDescription}</p>}
          {isSystemRole && (
            <p className="text-muted-foreground mt-1 text-xs">
              {'('}
              {literals.role.systemRole}
              {')'}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
