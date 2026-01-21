'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

interface UserPreferencesCardProps {
  onSavePreferences?: () => void
}

export function UserPreferencesCard({ onSavePreferences }: UserPreferencesCardProps) {
  const t = useTranslations('USER_DETAIL')
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [securityEmails, setSecurityEmails] = useState(true)
  const [productUpdates, setProductUpdates] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('PREFERENCES_CARD.TITLE')}</CardTitle>
        <CardDescription>{t('PREFERENCES_CARD.DESCRIPTION')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing">{t('PREFERENCES_CARD.MARKETING_EMAILS')}</Label>
              <p className="text-muted-foreground text-sm">{t('PREFERENCES_CARD.MARKETING_DESCRIPTION')}</p>
            </div>
            <Switch
              id="marketing"
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="security">{t('PREFERENCES_CARD.SECURITY_EMAILS')}</Label>
              <p className="text-muted-foreground text-sm">{t('PREFERENCES_CARD.SECURITY_DESCRIPTION')}</p>
            </div>
            <Switch
              id="security"
              checked={securityEmails}
              onCheckedChange={setSecurityEmails}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="updates">{t('PREFERENCES_CARD.PRODUCT_UPDATES')}</Label>
              <p className="text-muted-foreground text-sm">{t('PREFERENCES_CARD.UPDATES_DESCRIPTION')}</p>
            </div>
            <Switch
              id="updates"
              checked={productUpdates}
              onCheckedChange={setProductUpdates}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSavePreferences}>{t('PREFERENCES_CARD.SAVE_PREFERENCES')}</Button>
      </CardFooter>
    </Card>
  )
}
