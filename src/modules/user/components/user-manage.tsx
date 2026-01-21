import { getTranslations } from 'next-intl/server'

import GoBackButton from '@/components/shared/dashboard/go-back'
import ShareButton from '@/components/shared/layout/share-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { UserTypes } from '../validation/user.validation'

import { UserAccountsCard } from './user-accounts-card'
import { UserActivityCard } from './user-activity-card'
import { UserProfileCard } from './user-profile-card'
import { UserSessionsCard } from './user-sessions-card'

interface UserDetailProps {
  user: UserTypes['UserWithFullDetails']
}

export async function UserDetail({ user: initialUser }: UserDetailProps) {
  const t = await getTranslations('ORGANIZATION')
  return (
    <div className="grid h-full w-full grid-cols-12 gap-2">
      <Card className="col-span-12 h-[89.5vh] overflow-hidden overflow-y-scroll rounded-xl text-wrap break-all">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex h-full w-full flex-row items-center justify-end gap-4">
            <GoBackButton />
            <div className="h-full w-full">
              <CardTitle>{t('USER_TITLE')}</CardTitle>
              <CardDescription>{t('USER_DESC')}</CardDescription>
            </div>
          </div>
          <div className="flex h-full w-full flex-row items-center justify-end gap-4">
            <ShareButton />
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-4">
          <UserProfileCard user={initialUser} />
          <UserSessionsCard user={initialUser} />
          <UserAccountsCard user={initialUser} />
          <UserActivityCard user={initialUser} />
        </CardContent>
      </Card>
    </div>
  )
}
