import Shell from '@/components/shared/shell/shell'
import AuthPageLayout from '@/modules/auth/components/auth.layout'
import { ResetPasswordForm } from '@/modules/auth/components/reset-password/ResetPasswordForm' // To be created
import { getTranslations } from 'next-intl/server'
import { redirect } from '@/packages/next-intl/utils/navigation'
import { PATH } from '@/resources/config/routes.config'
import { auth } from '@/packages/next-auth'
import type { Locale } from 'next-intl'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
  searchParams: Promise<{
    token: string
  }>
}

export default async function ResetPasswordPage({ params, searchParams }: PageProps) {
  const session = await auth()
  const { locale } = await params
  const t = await getTranslations({ locale })

  if (session) {
    void redirect({ href: { pathname: PATH.ROOT }, locale })
  }

  const { token } = await searchParams
  if (!token) {
    // If token is not in query params, redirect to forgot password or show an error
    void redirect({ href: { pathname: PATH.PUBLIC.AUTH.FORGOT_PASSWORD }, locale })
    return null
  }

  return (
    <Shell>
      <Shell.Section>
        <AuthPageLayout
          title={t('AUTH.RESET_PASSWORD_TITLE')}
          description={t('AUTH.RESET_PASSWORD_DESCRIPTION')}
        >
          <ResetPasswordForm token={token} />
        </AuthPageLayout>
      </Shell.Section>
    </Shell>
  )
}
