import React from 'react'

import Shell from '@/components/shared/shell/shell'
import AccountPageLayout from '@/modules/account/components/sidebar/account.layout'
import EmailNotificationsCard from '@/modules/account/components/notification/account.notifications.email-notifications-card'
import PushNotificationsCard from '@/modules/account/components/notification/account.notifications.push-notifications-card'
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
            <EmailNotificationsCard />
            <PushNotificationsCard />
          </AccountTabs>
        </AccountPageLayout>
      </Shell.Section>
    </Shell>
  )
}
