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
          title="Invitation Organization"
          description="Manage and view invitations for your organization. This page allows you to handle pending invitations, send new ones, and track the status of existing invitations."
        >
          <DashboardPage defaultTab="INVITATION" />
        </OrganizationPageLayout>
      </Shell.Section>
    </Shell>
  )
}
