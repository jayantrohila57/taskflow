import React from 'react'

import Shell from '@/components/shared/shell/shell'
import AccountPageLayout from '@/modules/account/components/sidebar/account.layout'
import ChangePasswordCard from '@/modules/account/components/security/account.security.change-password-card'
import TwoFactorAuthenticationCard from '@/modules/account/components/security/account.security.two-factor-authentication-card'
import LoginHistoryCard from '@/modules/account/components/security/account.security.login-history-card'
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
            <ChangePasswordCard />
            <TwoFactorAuthenticationCard />
            <LoginHistoryCard />
          </AccountTabs>
        </AccountPageLayout>
      </Shell.Section>
    </Shell>
  )
}
