'use client'

import Header from '@/components/shared/layout/header'
import ErrorPageComponent from '@/components/shared/pages/error-page'
import BgGridPattern from '@/components/shared/shell/bg-grid-pattern'
import { useLocale } from 'next-intl'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const locale = useLocale()
  return (
    <>
      <Header locale={locale} />
      <ErrorPageComponent
        error={error}
        reset={reset}
      />
      <BgGridPattern />
    </>
  )
}
