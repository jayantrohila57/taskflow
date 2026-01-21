import { cookies } from 'next/headers'
import { redirect } from '@/packages/next-intl/utils/navigation'
import { PATH } from '@/resources/config/routes.config'
import { auth } from '@/packages/next-auth'
import type { Locale } from 'next-intl'

interface IntermediaryOrganizationHandlerProps {
  params: Promise<{ locale: Locale }>
}

// Note: This component will not render any visible UI.
// Its sole purpose is to handle redirects based on authentication and organization status.
export default async function IntermediaryOrganizationHandler({ params }: IntermediaryOrganizationHandlerProps) {
  const session = await auth()
  const { locale } = await params
  const cookiesStore = await cookies()
  const organizationCookie = cookiesStore.get('organization')

  // Always check for authentication first
  if (!session)
    redirect({
      href: PATH.PUBLIC.AUTH.ROOT,
      locale,
    })

  // If no organization cookie, redirect to the organization creation page
  if (!organizationCookie)
    redirect({
      href: PATH.PROTECTED.ORGANIZATION.CREATE,
      locale,
    })

  // If an organization cookie exists, redirect to the organization dashboard
  // Assuming that having an organization cookie means they should go to the dashboard
  if (organizationCookie)
    redirect({
      href: PATH.PROTECTED.ORGANIZATION.CREATE,
      locale,
    })

  return null
}
