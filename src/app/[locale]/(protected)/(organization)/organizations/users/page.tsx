import Shell from '@/components/shared/shell/shell'
import OrganizationPageLayout from '@/modules/organization/components/organization.layout'
import { debugLog } from '@/lib/utils'
import type { Locale } from 'next-intl'
import OrganizationUsers from '@/modules/organization/components/organization.users'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function OrganizationPage({ params }: PageProps) {
  const { locale } = await params
  debugLog('ORGANIZATION:USERS', locale)
  return (
    <Shell>
      <Shell.Section
        variant={'dashboard'}
        scale="full"
      >
        <OrganizationPageLayout
          title="User Management"
          description="Manage users within your organization and collaborate effectively"
        >
          <OrganizationUsers />
        </OrganizationPageLayout>
      </Shell.Section>
    </Shell>
  )
}
