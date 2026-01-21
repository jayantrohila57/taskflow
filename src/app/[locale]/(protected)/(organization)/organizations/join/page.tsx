import Shell from '@/components/shared/shell/shell'
import JoinOrganization from '@/modules/organization/components/organization.join'
import OrganizationPageLayout from '@/modules/organization/components/organization.layout'
import { debugLog } from '@/lib/utils'
import type { Locale } from 'next-intl'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function OrganizationPage({ params }: PageProps) {
  const { locale } = await params
  debugLog('ORGANIZATION:JOIN', locale)
  return (
    <Shell>
      <Shell.Section
        variant={'dashboard'}
        scale="full"
      >
        <OrganizationPageLayout
          title="Join Organization"
          description="Join an organization to collaborate and access shared resources"
        >
          <JoinOrganization />
        </OrganizationPageLayout>
      </Shell.Section>
    </Shell>
  )
}
