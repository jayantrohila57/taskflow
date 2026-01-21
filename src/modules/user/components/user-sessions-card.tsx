'use client'

import { useTranslations } from 'next-intl'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { UserTypes } from '../validation/user.validation'

import { UserSessions } from './user-sessions'

interface UserSessionsCardProps {
  user: UserTypes['UserWithFullDetails']
}

export function UserSessionsCard({ user }: UserSessionsCardProps) {
  const t = useTranslations('USER_DETAIL')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('SESSIONS_CARD.TITLE')}</CardTitle>
        <CardDescription>{t('SESSIONS_CARD.DESCRIPTION')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <UserSessions
          userId={user.id}
          initialSessions={user.sessions}
        />
      </CardContent>
    </Card>
  )
}
