'use client'

import { useTranslations } from 'next-intl'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { UserTypes } from '../validation/user.validation'

interface UserProfileCompletenessProps {
  user: UserTypes['UserWithFullDetails']
}

export function UserProfileCompleteness({ user }: UserProfileCompletenessProps) {
  const t = useTranslations('USER_DETAIL')

  const getAccountCompleteness = () => {
    let score = 0
    if (user.name) score += 20
    if (user.email) score += 20
    if (user.emailVerified) score += 20
    if (user.image) score += 20
    if (user.accounts?.length > 0) score += 20
    return score
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('PROFILE_COMPLETENESS.TITLE')}</CardTitle>
        <CardDescription>{t('PROFILE_COMPLETENESS.DESCRIPTION')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">{t('PROFILE_COMPLETENESS.PROGRESS')}</span>
            <span className="text-sm font-medium">
              {getAccountCompleteness()}
              {'%'}
            </span>
          </div>
          <div className="bg-muted h-2 w-full rounded-full">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${getAccountCompleteness()}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <div className={`mr-2 h-4 w-4 rounded-full ${user.name ? 'bg-green-500' : 'bg-muted'}`} />
            <span>{t('PROFILE_COMPLETENESS.NAME')}</span>
          </div>
          <div className="flex items-center">
            <div className={`mr-2 h-4 w-4 rounded-full ${user.email ? 'bg-green-500' : 'bg-muted'}`} />
            <span>{t('PROFILE_COMPLETENESS.EMAIL')}</span>
          </div>
          <div className="flex items-center">
            <div className={`mr-2 h-4 w-4 rounded-full ${user.emailVerified ? 'bg-green-500' : 'bg-muted'}`} />
            <span>{t('PROFILE_COMPLETENESS.EMAIL_VERIFIED')}</span>
          </div>
          <div className="flex items-center">
            <div className={`mr-2 h-4 w-4 rounded-full ${user.image ? 'bg-green-500' : 'bg-muted'}`} />
            <span>{t('PROFILE_COMPLETENESS.PROFILE_PICTURE')}</span>
          </div>
          <div className="flex items-center">
            <div className={`mr-2 h-4 w-4 rounded-full ${user.accounts?.length > 0 ? 'bg-green-500' : 'bg-muted'}`} />
            <span>{t('PROFILE_COMPLETENESS.CONNECTED_ACCOUNT')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
