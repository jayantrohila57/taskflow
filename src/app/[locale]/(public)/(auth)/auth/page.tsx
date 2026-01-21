import Shell from '@/components/shared/shell/shell'
import AuthPageLayout from '@/modules/auth/components/auth.layout'
import AuthPageComponent from '@/modules/auth/components/auth.page'
import { auth } from '@/packages/next-auth'
import { redirect } from '@/packages/next-intl/utils/navigation'
import { PATH } from '@/resources/config/routes.config'
import type { Locale } from 'next-intl'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function Home({ params }: PageProps) {
  const session = await auth()
  const { locale } = await params
  if (session)
    void redirect({
      href: {
        pathname: PATH.PROTECTED.ORGANIZATION.ROOT,
      },
      locale,
    })
  return (
    <Shell>
      <Shell.Section>
        <AuthPageLayout
          title={'Welcome to TaskFlow'}
          description={'How would you like to proceed? Please select the option that best suits your needs.'}
        >
          <AuthPageComponent params={params} />
        </AuthPageLayout>
      </Shell.Section>
    </Shell>
  )
}
