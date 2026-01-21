'use client'

import { useTranslations } from 'next-intl'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { UserTypes } from '../validation/user.validation'

import { UserAccounts } from './user-accounts'

interface UserAccountsCardProps {
  user: UserTypes['UserWithFullDetails']
}

export function UserAccountsCard({ user }: UserAccountsCardProps) {
  const t = useTranslations('USER_DETAIL')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('ACCOUNTS_CARD.TITLE')}</CardTitle>
        <CardDescription>{t('ACCOUNTS_CARD.DESCRIPTION')}</CardDescription>
      </CardHeader>
      <CardContent>
        <UserAccounts
          userId={user.id}
          initialAccounts={user.accounts}
        />
      </CardContent>
    </Card>
  )
}
