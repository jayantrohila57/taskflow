import { Building } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Assuming literals are defined elsewhere
const literals = {
  organizations: {
    none: 'No Organizations',
    single: '1 Organization',
    multiple: (count: number) => `${count} Organizations`,
    tooltip: (count: number) =>
      count === 0
        ? 'User belongs to no organizations'
        : `User belongs to ${count} ${count === 1 ? 'organization' : 'organizations'}`,
    viewDetails: 'View Details',
  },
}

interface OrganizationsCellProps {
  orgLength: number
}

export function OrganizationsCell({ orgLength }: OrganizationsCellProps) {
  const orgText =
    orgLength === 0
      ? literals.organizations.none
      : orgLength === 1
        ? literals.organizations.single
        : literals.organizations.multiple(orgLength)

  const tooltipText = literals.organizations.tooltip(orgLength)

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-1.5">
            <Building className="text-muted-foreground h-4 w-4" />
            <span className={`text-sm ${orgLength === 0 ? 'text-muted-foreground' : ''}`}>{orgText}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
