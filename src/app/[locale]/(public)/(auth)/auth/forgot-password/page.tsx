import Shell from '@/components/shared/shell/shell'
import AuthPageLayout from '@/modules/auth/components/auth.layout'
import { ForgotPassword } from '@/modules/auth/components/forgot/auth.forgot'

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

export default async function ForgotPasswordPage({ params }: PageProps) {
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
          title={t('AUTH.FORGOT_PASSWORD_TITLE')}
          description={t('AUTH.FORGOT_PASSWORD_DESCRIPTION')}
        >
          <ForgotPassword />
        </AuthPageLayout>
      </Shell.Section>
    </Shell>
  )
}
