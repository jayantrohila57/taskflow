import Shell from '@/components/shared/shell/shell'
import CreateOrganization from '@/modules/organization/components/organization.create'
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
  debugLog('ORGANIZATION:CREATE', locale)
  return (
    <Shell>
      <Shell.Section
        variant={'dashboard'}
        scale="full"
      >
        <OrganizationPageLayout
          title="Create Organization"
          description="Fill out the form to create a new organization and manage its details."
        >
          <CreateOrganization />
        </OrganizationPageLayout>
      </Shell.Section>
    </Shell>
  )
}
