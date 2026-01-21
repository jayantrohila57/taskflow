import React from 'react'

import Footer from '@/components/shared/layout/footer'
import Header from '@/components/shared/layout/header'
import Shell from '@/components/shared/shell/shell'
import BgGridPattern from '@/components/shared/shell/bg-grid-pattern'
import type { Locale } from 'next-intl'

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
