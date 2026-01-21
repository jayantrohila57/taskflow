import type { Row } from '@tanstack/react-table'
import { Shield } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { UserTypes } from '../../../validation/user.validation'

// Assuming literals are defined elsewhere and passed or imported
const literals = {
  user: {
    unknown: 'Unknown',
    system: 'System',
    fallback: 'U',
  },
}

interface UserCellProps {
  row: Row<UserTypes['UserWithRole']>
}

export function UserCell({ row }: UserCellProps) {
  const user = row.original
  const name = user.name ?? literals.user.unknown
  const email = user.email ?? literals.user.unknown
  const image = user.image
  const isSystem = user.isSystem ?? false

  // Determine the fallback text
  const fallbackText = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : literals.user.fallback

  return (
    <div className="flex items-center space-x-3">
      <Avatar className="h-9 w-9 border">
        {image ? (
          <AvatarImage
            src={image}
            alt={name}
          />
        ) : (
          <AvatarImage
            src="invalid-url"
            alt={name}
          /> // Force fallback if no image
        )}
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>
      <TooltipProvider delayDuration={100}>
        <div className="flex flex-col truncate">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="truncate font-medium">{name}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-muted-foreground truncate text-sm">{email}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{email}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      {isSystem && (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="secondary"
                className="ml-auto flex-shrink-0"
              >
                <Shield className="mr-1 h-3 w-3" />
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{literals.user.system}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}
