import React from 'react'

import Shell from '@/components/shared/shell/shell'
import AccountPageLayout from '@/modules/account/components/sidebar/account.layout'
import ActiveSessionsCard from '@/modules/account/components/sessions/account.sessions.active-sessions-card'
import SessionHistoryCard from '@/modules/account/components/sessions/account.sessions.session-history-card'
import AccountTabs from '@/modules/account/components/account.tabs'
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
          <AccountTabs>
            <ActiveSessionsCard />
            <SessionHistoryCard />
          </AccountTabs>
        </AccountPageLayout>
      </Shell.Section>
    </Shell>
  )
}
