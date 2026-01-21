import Shell from '@/components/shared/shell/shell'
import OrganizationPageLayout from '@/modules/organization/components/organization.layout'
import { debugLog } from '@/lib/utils'
import type { Locale } from 'next-intl'
import OrganizationManageRoles from '@/modules/organization/components/organization.manage.role'
import OrganizationManagePermissions from '@/modules/organization/components/organization.manage.permissions'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function OrganizationPage({ params }: PageProps) {
  const { locale } = await params
  debugLog('ORGANIZATION:MANAGE ROLES', locale)
  return (
    <Shell>
      <Shell.Section
        variant={'dashboard'}
        scale="full"
      >
        <OrganizationPageLayout
          title="Manage Permissions"
          description="Manage permissions within your organization and collaborate effectively"
        >
          <OrganizationManagePermissions />
        </OrganizationPageLayout>
      </Shell.Section>
    </Shell>
  )
}
