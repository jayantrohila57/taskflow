import Shell from '@/components/shared/shell/shell'
import type { Locale } from 'next-intl'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function Page({ params }: PageProps) {
  return (
    <Shell>
      <Shell.Section>{'Page'}</Shell.Section>
    </Shell>
  )
}
