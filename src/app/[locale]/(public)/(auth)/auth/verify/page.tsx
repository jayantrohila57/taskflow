import Shell from '@/components/shared/shell/shell'
import AuthPageLayout from '@/modules/auth/components/auth.layout'
import { auth } from '@/packages/next-auth'
import { redirect } from '@/packages/next-intl/utils/navigation'
import { PATH } from '@/resources/config/routes.config'
import type { Locale } from 'next-intl'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function VerifyPage({ params }: PageProps) {
  const session = await auth()
  const { locale } = await params
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
          title=""
          description=""
        >
          {'Verify page'}
        </AuthPageLayout>
      </Shell.Section>
    </Shell>
  )
}
