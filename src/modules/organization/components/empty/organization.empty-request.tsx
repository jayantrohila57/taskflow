import { Button } from '@/components/ui/button'
import EmptyStateIllustration from '@/resources/assets/svg/no-data'
import { PATH } from '@/resources/config/routes.config'
import { Link } from '@/packages/next-intl/utils/navigation'

const EMPTY_STATE_LITERALS = {
  NO_PENDING_REQUESTS: 'No Pending Requests',
  NO_OUTSTANDING_REQUESTS_MESSAGE: "You don't have any pending join requests to organizations right now.",
  BROWSE_ORGANIZATIONS: 'Browse Organizations',
  CREATE_ORGANIZATION: 'Create Organization',
  WANT_TO_JOIN: 'Want to join an organization?',
  EXPLORE_AND_REQUEST: 'Explore available organizations and send a join request.',
}

function EmptyPendingRequests() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-6 text-center">
      <div className="relative flex h-full items-end justify-center">
        <EmptyStateIllustration
          height={200}
          className="hidden dark:block"
          isDark
        />
        <EmptyStateIllustration
          height={200}
          className="block dark:hidden"
        />
      </div>
      <div className="h-full w-full max-w-xl">
        <h2 className="mb-2 text-3xl font-semibold tracking-tight">{EMPTY_STATE_LITERALS.NO_PENDING_REQUESTS}</h2>
        <p className="text-muted-foreground mb-4 text-lg">{EMPTY_STATE_LITERALS.NO_OUTSTANDING_REQUESTS_MESSAGE}</p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            asChild
          >
            <Link href={PATH.PROTECTED.ORGANIZATION.JOIN}>{EMPTY_STATE_LITERALS.BROWSE_ORGANIZATIONS}</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
          >
            <Link href={PATH.PROTECTED.ORGANIZATION.CREATE}>{EMPTY_STATE_LITERALS.CREATE_ORGANIZATION}</Link>
          </Button>
        </div>
        <p className="text-muted-foreground mt-6 text-sm">{EMPTY_STATE_LITERALS.EXPLORE_AND_REQUEST}</p>
      </div>
    </div>
  )
}

export default EmptyPendingRequests
