import Shell from '@/components/shared/shell/shell'
import { HomePage } from '@/modules/home/home'
import type { Locale } from 'next-intl'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function Home({ params }: PageProps) {
  return (
    <Shell>
      <Shell.Section padding={'center'}>
        <HomePage params={params} />
      </Shell.Section>
    </Shell>
  )
}
