import { ExternalLink } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Link } from '@/packages/next-intl/utils/navigation'

interface IdCellProps {
  id: string
}

export function IdCell({ id }: IdCellProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/sys/dashboard/users/${id}`}>
            <Badge
              variant="outline"
              className="hover:bg-accent hover:text-accent-foreground flex items-center gap-1 truncate font-mono text-xs transition-colors"
            >
              {id}
              <ExternalLink className="h-3 w-3" />
            </Badge>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-mono text-xs">{id}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
