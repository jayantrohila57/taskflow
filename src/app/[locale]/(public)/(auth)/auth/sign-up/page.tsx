import Shell from '@/components/shared/shell/shell'
import AuthPageLayout from '@/modules/auth/components/auth.layout'
import { SignUp } from '@/modules/auth/components/sign-up/auth.sign-up'
import SocialAuth from '@/modules/auth/components/sign-up/auth.social'

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

export default async function SignUpPage({ params }: PageProps) {
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
          title={t('AUTH.SIGNUP_TITLE')}
          description={t('AUTH.SIGNUP_DESCRIPTION')}
        >
          <SocialAuth />
          <SignUp />
        </AuthPageLayout>
      </Shell.Section>
    </Shell>
  )
}
