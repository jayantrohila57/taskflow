'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const PUSH_NOTIFICATIONS = [
  { id: 'pushEnabled', label: 'Enable push notifications' },
  { id: 'pushMessages', label: 'New messages' },
  { id: 'pushUpdates', label: 'Product updates' },
]

const PUSH_TEXT = {
  TITLE: 'PUSH_NOTIFICATIONS',
  SAVE_PREFERENCES: 'SAVE_PREFERENCES',
}

const PushNotificationsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{PUSH_TEXT.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          {PUSH_NOTIFICATIONS.map(({ id, label }) => (
            <div
              className="flex items-center space-x-2"
              key={id}
            >
              <Switch id={id} />
              <Label htmlFor={id}>{label}</Label>
            </div>
          ))}
          <Button type="submit">{PUSH_TEXT.SAVE_PREFERENCES}</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default PushNotificationsCard
