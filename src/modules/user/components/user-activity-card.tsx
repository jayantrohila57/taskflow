'use client'

import { format } from 'date-fns'
import { Lock, Unlock } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { UserTypes } from '../validation/user.validation'

interface UserActivityCardProps {
  user: UserTypes['UserWithFullDetails']
}

export function UserActivityCard({ user }: UserActivityCardProps) {
  const t = useTranslations('USER_DETAIL')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('ACTIVITY_CARD.TITLE')}</CardTitle>
        <CardDescription>{t('ACTIVITY_CARD.DESCRIPTION')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {user.sessions?.slice(0, 5).map((session) => (
            <div
              key={session.id}
              className="flex items-start space-x-3"
            >
              <div className="bg-primary/10 rounded-full p-2">
                {session.isRevoked ? (
                  <Lock className="text-muted-foreground h-4 w-4" />
                ) : (
                  <Unlock className="text-primary h-4 w-4" />
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {session.isRevoked
                    ? t('ACTIVITY_CARD.SESSION_REVOKED')
                    : session.endedAt
                      ? t('ACTIVITY_CARD.SESSION_ENDED')
                      : t('ACTIVITY_CARD.SESSION_ACTIVE')}
                </p>
                <p className="text-muted-foreground text-xs">
                  {session.userAgent || t('ACTIVITY_CARD.UNKNOWN_DEVICE')}
                </p>
                <p className="text-muted-foreground text-xs">{format(new Date(session.lastActive), 'PPp')}</p>
              </div>
            </div>
          ))}

          {(!user.sessions || user.sessions.length === 0) && (
            <p className="text-muted-foreground text-sm">{t('ACTIVITY_CARD.NO_ACTIVITY')}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
