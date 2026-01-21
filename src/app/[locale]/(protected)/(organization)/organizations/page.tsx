import React from 'react'

import Shell from '@/components/shared/shell/shell'
import OrganizationPageLayout from '@/modules/organization/components/organization.layout'
import OrganizationOverview from '@/modules/organization/components/organization.overview'

interface LayoutProps {
  params: Promise<{ locale: string }>
}

export default async function Layout({ params }: LayoutProps) {
  const { locale } = await params
  return (
    <Shell>
      <Shell.Section
        variant={'dashboard'}
        scale="full"
      >
        <OrganizationPageLayout
          title="Organization Overview"
          description="Monitor performance and activity across all your organizations."
        >
          <OrganizationOverview />
        </OrganizationPageLayout>
      </Shell.Section>
    </Shell>
  )
}
