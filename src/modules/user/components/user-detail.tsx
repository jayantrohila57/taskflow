'use client'

import { useTranslations } from 'next-intl'

import { Card, CardContent } from '@/components/ui/card'
import { debugLog } from '@/lib/utils'
import type { UserTypes } from '../validation/user.validation'

import { UserAccountsCard } from './user-accounts-card'
import { UserActivityCard } from './user-activity-card'
import { UserDangerZone } from './user-danger-zone'
import { UserPreferencesCard } from './user-preferences-card'
import { UserProfileCard } from './user-profile-card'
import { UserProfileCompleteness } from './user-profile-completeness'
import { UserSecurityCard } from './user-security-card'
import { UserSessionsCard } from './user-sessions-card'

interface UserDetailProps {
  user: UserTypes['UserWithFullDetails']
}

const toast = ({ title, description, variant }: { title: string; description: string; variant?: string }) => {
  debugLog('TOAST', `Toast (${variant || 'default'}): ${title} - ${description}`)
}

export function UserDetail({ user: initialUser }: UserDetailProps) {
  const t = useTranslations('USER_DETAIL')
  const handleSavePreferences = () => {
    toast({
      title: t('PREFERENCES_CARD.SAVE_PREFERENCES'),
      description: t('PREFERENCES_CARD.PREFERENCES_SAVED_DESCRIPTION'),
    })
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <UserProfileCard user={initialUser} />
        <UserProfileCompleteness user={initialUser} />
        <UserSecurityCard user={initialUser} />
        <UserSessionsCard user={initialUser} />
        <UserAccountsCard user={initialUser} />
        <UserActivityCard user={initialUser} />
        <UserDangerZone />
        <UserPreferencesCard onSavePreferences={handleSavePreferences} />
      </CardContent>
    </Card>
  )
}
