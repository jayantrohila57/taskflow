import { Button } from '@/components/ui/button'
import { Link } from '@/packages/next-intl/utils/navigation'
import EmptyStateIllustration from '@/resources/assets/svg/no-data'
import { PATH } from '@/resources/config/routes.config'

const EMPTY_STATE_LITERALS = {
  NO_ORGANIZATION_YET: 'No Organization Yet',
  GET_STARTED_MESSAGE: 'Get started by creating your own organization or joining one.',
  CREATE_ORGANIZATION: 'Create Organization',
  JOIN_ORGANIZATION: 'Join Organization',
  ALREADY_HAVE_INVITE: 'Already have an invitation? Look for a link in your email.',
  DISCOVER_BENEFITS: 'Enjoy shared resources, streamlined communication, and effective teamwork.',
}

function EmptyOrganizationState() {
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
        <h2 className="mb-2 text-3xl font-semibold tracking-tight">{EMPTY_STATE_LITERALS.NO_ORGANIZATION_YET}</h2>
        <p className="text-muted-foreground mb-4 text-lg">{EMPTY_STATE_LITERALS.GET_STARTED_MESSAGE}</p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            asChild
          >
            <Link href={PATH.PROTECTED.ORGANIZATION.CREATE}>{EMPTY_STATE_LITERALS.CREATE_ORGANIZATION}</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
          >
            <Link href={PATH.PROTECTED.ORGANIZATION.JOIN}>{EMPTY_STATE_LITERALS.JOIN_ORGANIZATION}</Link>
          </Button>
        </div>
        <p className="text-muted-foreground mt-6 text-sm">{EMPTY_STATE_LITERALS.DISCOVER_BENEFITS}</p>
      </div>
    </div>
  )
}

export default EmptyOrganizationState
