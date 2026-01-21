'use client'

import { Key, Lock, RefreshCw, Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import type { UserTypes } from '../validation/user.validation'

interface UserSecurityCardProps {
  user: UserTypes['UserWithFullDetails']
}

export function UserSecurityCard({ user }: UserSecurityCardProps) {
  const t = useTranslations('USER_DETAIL')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('SECURITY_CARD.TITLE')}</CardTitle>
        <CardDescription>{t('SECURITY_CARD.DESCRIPTION')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="text-muted-foreground mr-2 h-4 w-4" />
              <span>{t('SECURITY_CARD.EMAIL_VERIFICATION')}</span>
            </div>
            {user.emailVerified ? (
              <Badge
                variant="outline"
                className="flex items-center gap-1 bg-green-100 text-green-800"
              >
                {t('SECURITY_CARD.VERIFIED')}
              </Badge>
            ) : (
              <Button
                variant="outline"
                size="sm"
              >
                {t('SECURITY_CARD.SEND_VERIFICATION')}
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Key className="text-muted-foreground mr-2 h-4 w-4" />
              <span>{t('SECURITY_CARD.PASSWORD_RESET')}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {t('SECURITY_CARD.SEND_RESET')}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Lock className="text-muted-foreground mr-2 h-4 w-4" />
              <span>{t('SECURITY_CARD.TWO_FACTOR')}</span>
            </div>
            <Switch
              checked={false}
              disabled
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
