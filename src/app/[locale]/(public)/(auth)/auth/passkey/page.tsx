import Shell from '@/components/shared/shell/shell'
import AuthPageLayout from '@/modules/auth/components/auth.layout'
import { PasskeySignInForm } from '@/modules/auth/components/passkey/PasskeySignInForm'
import { getTranslations } from 'next-intl/server'
import { redirect } from '@/packages/next-intl/utils/navigation'
import { PATH } from '@/resources/config/routes.config'
import { auth } from '@/packages/next-auth'
import type { Locale } from 'next-intl'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function PasskeySignInPage({ params }: PageProps) {
  const session = await auth()
  const { locale } = await params
  const t = await getTranslations({ locale })

  if (session) {
    void redirect({ href: { pathname: PATH.ROOT }, locale })
  }

  return (
    <Shell>
      <Shell.Section>
        <AuthPageLayout
          title={t('AUTH.PASSKEY_SIGNIN_TITLE')}
          description={t('AUTH.PASSKEY_SIGNIN_DESCRIPTION')}
        >
          <PasskeySignInForm />
        </AuthPageLayout>
      </Shell.Section>
    </Shell>
  )
}
