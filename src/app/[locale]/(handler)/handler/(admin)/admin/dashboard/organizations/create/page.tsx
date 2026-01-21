import { debugLog } from '@/lib/utils'
import type { Locale } from 'next-intl'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function OrganizationPage({ params }: PageProps) {
  const { locale } = await params
  debugLog('ORGANIZATION:CREATE', locale)
  return <>{'Create org'}</>
}
