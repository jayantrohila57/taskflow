import React from 'react'

import Shell from '@/components/shared/shell/shell'
import AccountPageLayout from '@/modules/account/components/sidebar/account.layout'
import { CurrentPlanCard } from '@/modules/account/components/billing/account.billing.current-plan-card'
import { PaymentMethodCard } from '@/modules/account/components/billing/account.billing.payment-method-card'
import { BillingHistoryCard } from '@/modules/account/components/billing/account.billing.billing-history-card'
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
            <CurrentPlanCard />
            <PaymentMethodCard />
            <BillingHistoryCard />
          </AccountTabs>
        </AccountPageLayout>
      </Shell.Section>
    </Shell>
  )
}
