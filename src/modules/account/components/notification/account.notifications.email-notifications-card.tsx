'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const EMAIL_NOTIFICATIONS = [
  { id: 'accountNotifications', label: 'Account notifications' },
  { id: 'marketingEmails', label: 'Marketing emails' },
  { id: 'newsletterEmails', label: 'Newsletter' },
]

const EMAIL_TEXT = {
  TITLE: 'EMAIL_NOTIFICATIONS',
  SAVE_PREFERENCES: 'SAVE_PREFERENCES',
}

const EmailNotificationsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{EMAIL_TEXT.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          {EMAIL_NOTIFICATIONS.map(({ id, label }) => (
            <div
              className="flex items-center space-x-2"
              key={id}
            >
              <Switch id={id} />
              <Label htmlFor={id}>{label}</Label>
            </div>
          ))}
          <Button type="submit">{EMAIL_TEXT.SAVE_PREFERENCES}</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default EmailNotificationsCard
