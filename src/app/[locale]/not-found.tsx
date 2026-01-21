import Footer from '@/components/shared/layout/footer'
import Header from '@/components/shared/layout/header'
import NotFoundComponent from '@/components/shared/pages/not-found'
import BgGridPattern from '@/components/shared/shell/bg-grid-pattern'
import Shell from '@/components/shared/shell/shell'
import { getLocale } from 'next-intl/server'

export default async function NotFound() {
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
          <NotFoundComponent />
        </Shell.Section>
        <BgGridPattern />
      </Shell.Main>
      <Shell.Footer>
        <Footer locale={locale} />
      </Shell.Footer>
    </Shell>
  )
}
