import Shell from '@/components/shared/shell/shell'
import AuthPageLayout from '@/modules/auth/components/auth.layout'
import { VerifyOtpForm } from '@/modules/auth/components/verify-otp/VerifyOtpForm' // To be created
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
    email: string
  }>
}

export default async function VerifyOtpPage({ params, searchParams }: PageProps) {
  const session = await auth()
  const { locale } = await params
  const t = await getTranslations({ locale })

  if (session) {
    void redirect({ href: { pathname: PATH.ROOT }, locale })
  }

  const { email } = await searchParams
  if (!email) {
    // If email is not in query params, redirect to forgot password or show an error
    void redirect({ href: { pathname: PATH.PUBLIC.AUTH.FORGOT_PASSWORD }, locale })
    return null // Or an error component
  }

  return (
    <Shell>
      <Shell.Section>
        <AuthPageLayout
          title={t('AUTH.VERIFY_OTP_TITLE')}
          description={t('AUTH.VERIFY_OTP_DESCRIPTION', { email })}
        >
          <VerifyOtpForm email={email} />
        </AuthPageLayout>
      </Shell.Section>
    </Shell>
  )
}
