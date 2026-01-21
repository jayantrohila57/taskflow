'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const SESSION_HISTORY_TEXT = {
  TITLE: 'SESSION_HISTORY',
  DEVICE_1: 'WINDOWS_10_FIREFOX',
  DEVICE_2: 'ANDROID_TABLET_CHROME',
  LAST_ACTIVE: 'LAST_ACTIVE',
  VIEW_FULL_HISTORY: 'VIEW_FULL_HISTORY',
}

const SESSION_HISTORY_DETAILS = [
  {
    device: 'Windows 10 (Firefox)',
    lastActive: '2023-05-10 09:30:00 UTC',
  },
  {
    device: 'Android Tablet (Chrome)',
    lastActive: '2023-05-05 14:15:00 UTC',
  },
]

const SessionHistoryCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{SESSION_HISTORY_TEXT.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {SESSION_HISTORY_DETAILS.map((session, index) => (
            <div key={index}>
              <p>
                <strong>{session.device}</strong>
              </p>
              <p>
                {SESSION_HISTORY_TEXT.LAST_ACTIVE}
                {':'} {session.lastActive}
              </p>
            </div>
          ))}
          <Button variant="outline">{SESSION_HISTORY_TEXT.VIEW_FULL_HISTORY}</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default SessionHistoryCard
