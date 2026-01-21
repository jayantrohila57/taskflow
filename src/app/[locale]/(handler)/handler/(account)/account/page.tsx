import React from 'react'

import Shell from '@/components/shared/shell/shell'
import AccountPageLayout from '@/modules/account/components/sidebar/account.layout'
import AccountOverviewPage from '@/modules/account/components/account.overview'
import type { Locale } from 'next-intl'

interface LayoutProps {
  params: Promise<{ locale: Locale }>
}

export default async function AccountPage({ params }: LayoutProps) {
  const { locale } = await params
  return (
    <Shell>
      <Shell.Section
        variant={'dashboard'}
        scale="full"
      >
        <AccountPageLayout
          title="Account"
          description="Manage your account settings and preferences."
        >
          <AccountOverviewPage />
        </AccountPageLayout>
      </Shell.Section>
    </Shell>
  )
}
