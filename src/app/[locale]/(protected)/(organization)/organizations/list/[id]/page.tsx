import React from 'react'

import Shell from '@/components/shared/shell/shell'
import OrganizationPageLayout from '@/modules/organization/components/organization.layout'
import type { Locale } from 'next-intl'
import OrganizationViewPage from '@/modules/organization/components/organization-manage/organization-view/organization-view.page'

interface LayoutProps {
  params: Promise<{ locale: Locale; id: string }>
}

export default async function Layout({ params }: LayoutProps) {
  const { locale, id } = await params
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
          <OrganizationViewPage params={{ id }} />
        </OrganizationPageLayout>
      </Shell.Section>
    </Shell>
  )
}
