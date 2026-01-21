import React from 'react'

import Shell from '@/components/shared/shell/shell'
import AccountPageLayout from '@/modules/account/components/sidebar/account.layout'
import { PersonalInformationCard } from '@/modules/account/components/profile/account.profile.personal-information-card'
import ContactInformationCard from '@/modules/account/components/profile/account.profile.contact-information-card'
import SocialProfilesCard from '@/modules/account/components/profile/account.profile.social-profiles-card'
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
            <PersonalInformationCard />
            <ContactInformationCard />
            <SocialProfilesCard />
          </AccountTabs>
        </AccountPageLayout>
      </Shell.Section>
    </Shell>
  )
}
