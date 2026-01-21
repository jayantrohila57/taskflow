import React from 'react'

import Footer from '@/components/shared/layout/footer'
import Header from '@/components/shared/layout/header'
import BgGridPattern from '@/components/shared/shell/bg-grid-pattern'
import Shell from '@/components/shared/shell/shell'
import type { Locale } from 'next-intl'

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return {
    title: 'Authentication | TaskFlow',
    description: 'Sign in or create an account to access TaskFlow',
  }
}

interface SiteLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const { locale } = await params
  return (
    <Shell>
      <Shell.Header variant={'sticky'}>
        <Header locale={locale} />
      </Shell.Header>
      <Shell.Main>
        {children}
        <BgGridPattern />
      </Shell.Main>
      <Shell.Footer>
        <Footer locale={locale} />
      </Shell.Footer>
    </Shell>
  )
}
