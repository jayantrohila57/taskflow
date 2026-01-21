import Shell from '@/components/shared/shell/shell'
import AuthPageLayout from '@/modules/auth/components/auth.layout'
import { AuthSignInPage } from '@/modules/auth/components/sign-in/auth.sign-in'
import { auth } from '@/packages/next-auth'
import { redirect } from '@/packages/next-intl/utils/navigation'
import { PATH } from '@/resources/config/routes.config'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function SignInPage({ params }: PageProps) {
  const session = await auth()
  const { locale } = await params
  const t = await getTranslations({ locale })
  if (session)
    void redirect({
      href: {
        pathname: PATH.ROOT,
      },
      locale,
    })
  return (
    <Shell>
      <Shell.Section>
        <AuthPageLayout
          title={t('AUTH.SIGNIN')}
          description={t('AUTH.SIGNIN_DESCRIPTION')}
        >
          <AuthSignInPage params={params} />
        </AuthPageLayout>
      </Shell.Section>
    </Shell>
  )
}
