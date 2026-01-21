import { Button } from '@/components/ui/button'
import EmptyStateIllustration from '@/resources/assets/svg/no-data'
import { PATH } from '@/resources/config/routes.config'
import { Link } from '@/packages/next-intl/utils/navigation'

const EMPTY_STATE_LITERALS = {
  NO_INVITATIONS_YET: 'No Invitations Yet',
  NO_PENDING_INVITES_MESSAGE: "You don't have any pending organization invitations right now.",
  BROWSE_ORGANIZATIONS: 'Browse Organizations',
  CREATE_ORGANIZATION: 'Create Organization',
  HAVE_NOT_RECEIVED: "Haven't received an invite? Ask the organization administrator to send you one.",
  DISCOVER_BENEFITS: 'Join an organization to enjoy shared resources and streamlined communication.',
}

function EmptyOrganizationInvitations() {
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
        <h2 className="mb-2 text-3xl font-semibold tracking-tight">{EMPTY_STATE_LITERALS.NO_INVITATIONS_YET}</h2>
        <p className="text-muted-foreground mb-4 text-lg">{EMPTY_STATE_LITERALS.NO_PENDING_INVITES_MESSAGE}</p>
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
        <p className="text-muted-foreground mt-6 text-sm">{EMPTY_STATE_LITERALS.HAVE_NOT_RECEIVED}</p>
      </div>
    </div>
  )
}

export default EmptyOrganizationInvitations
