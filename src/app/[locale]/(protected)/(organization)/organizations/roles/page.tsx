import Shell from '@/components/shared/shell/shell'
import OrganizationPageLayout from '@/modules/organization/components/organization.layout'
import { debugLog } from '@/lib/utils'
import type { Locale } from 'next-intl'
import OrganizationRoles from '@/modules/organization/components/organization.roles'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function OrganizationPage({ params }: PageProps) {
  const { locale } = await params
  debugLog('ORGANIZATION:ROLES AND PERMISSION', locale)
  return (
    <Shell>
      <Shell.Section
        variant={'dashboard'}
        scale="full"
      >
        <OrganizationPageLayout
          title="Roles and Permissions"
          description="Manage roles and permissions within your organization and collaborate effectively"
        >
          <OrganizationRoles />
        </OrganizationPageLayout>
      </Shell.Section>
    </Shell>
  )
}
