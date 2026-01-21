'use client'

import { Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface UserDangerZoneProps {
  onDeleteAccount?: () => void
}

export function UserDangerZone({ onDeleteAccount }: UserDangerZoneProps) {
  const t = useTranslations('USER_DETAIL')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('DANGER_ZONE.TITLE')}</CardTitle>
        <CardDescription>{t('DANGER_ZONE.DESCRIPTION')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-destructive/20 rounded-md border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-destructive font-medium">{t('DANGER_ZONE.DELETE_ACCOUNT')}</h4>
              <p className="text-muted-foreground text-sm">{t('DANGER_ZONE.DELETE_ACCOUNT_DESCRIPTION')}</p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={onDeleteAccount}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {t('DANGER_ZONE.DELETE_BUTTON')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
