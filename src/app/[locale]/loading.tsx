import Footer from '@/components/shared/layout/footer'
import Header from '@/components/shared/layout/header'
import LoadingComponent from '@/components/shared/pages/loading-page'
import BgGridPattern from '@/components/shared/shell/bg-grid-pattern'
import Shell from '@/components/shared/shell/shell'
import { getLocale } from 'next-intl/server'

export default async function Loading() {
  const locale = await getLocale()
  return (
    <Shell>
      <Shell.Header>
        <Header locale={locale} />
      </Shell.Header>
      <Shell.Main
        variant={'centered'}
        padding="none"
      >
        <Shell.Section variant="center">
          <LoadingComponent />
        </Shell.Section>
        <BgGridPattern />
      </Shell.Main>
      <Shell.Footer>
        <Footer locale={locale} />
      </Shell.Footer>
    </Shell>
  )
}
