import React from 'react'

import Shell from '@/components/shared/shell/shell'
import OrganizationPageLayout from '@/modules/organization/components/organization.layout'
import DashboardPage from '@/modules/organization/components/organization.page'
import type { Locale } from 'next-intl'

interface LayoutProps {
  params: Promise<{ locale: Locale }>
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
          title="Organization"
          description="Organization page"
        >
          <DashboardPage />
        </OrganizationPageLayout>
      </Shell.Section>
    </Shell>
  )
}
