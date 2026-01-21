'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const TWO_FACTOR_AUTH_TEXT = {
  TITLE: 'TWO_FACTOR_AUTHENTICATION',
  ENABLE_2FA: 'ENABLE_2FA',
  SET_UP_2FA: 'SET_UP_2FA',
}

const TwoFactorAuthenticationCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{TWO_FACTOR_AUTH_TEXT.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="2fa" />
            <Label htmlFor="2fa">{TWO_FACTOR_AUTH_TEXT.ENABLE_2FA}</Label>
          </div>
          <Button variant="outline">{TWO_FACTOR_AUTH_TEXT.SET_UP_2FA}</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default TwoFactorAuthenticationCard
