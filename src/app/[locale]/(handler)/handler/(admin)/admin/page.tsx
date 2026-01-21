import { auth } from '@/packages/next-auth'
import { redirect } from '@/packages/next-intl/utils/navigation'
import { PATH } from '@/resources/config/routes.config'
import type { Locale } from 'next-intl'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  const session = await auth()

  if (session) {
    redirect({
      href: PATH.HANDLER.ADMIN.DASHBOARD,
      locale,
    })
  }
  redirect({
    href: PATH.PUBLIC.AUTH.ROOT,
    locale,
  })
}
