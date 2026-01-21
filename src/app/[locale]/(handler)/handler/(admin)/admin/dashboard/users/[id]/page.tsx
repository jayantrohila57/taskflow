import { notFound } from 'next/navigation'

import { UserDetail } from '@/modules/user/components/user-manage'
import type { UserTypes } from '@/modules/user/validation/user.validation'
import { api } from '@/packages/trpc/server'
import type { Locale } from 'next-intl'

interface UserDetailPageProps {
  params: Promise<{
    id: string
    locale: Locale
  }>
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params
  try {
    const { data } = await api.user.getFullUserDetailsById({ id })
    if (!data) {
      notFound()
    }
    const user = data as UserTypes['UserWithFullDetails']
    return <UserDetail user={user} />
  } catch {
    notFound()
  }
}
