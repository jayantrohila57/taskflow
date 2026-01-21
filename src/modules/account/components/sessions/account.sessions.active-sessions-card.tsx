'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const ACTIVE_SESSIONS_TEXT = {
  TITLE: 'ACTIVE_SESSIONS',
  DEVICE_1: 'MACBOOK_PRO_CHROME',
  DEVICE_2: 'IPHONE_12_SAFARI',
  LAST_ACTIVE: 'LAST_ACTIVE',
  LOGOUT: 'LOGOUT',
}

const ACTIVE_SESSIONS_DETAILS = [
  {
    device: 'MacBook Pro (Chrome)',
    lastActive: '2 minutes ago',
  },
  {
    device: 'iPhone 12 (Safari)',
    lastActive: '1 hour ago',
  },
]

const ActiveSessionsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{ACTIVE_SESSIONS_TEXT.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ACTIVE_SESSIONS_DETAILS.map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{session.device}</p>
                <p className="text-sm text-gray-500">
                  {ACTIVE_SESSIONS_TEXT.LAST_ACTIVE}
                  {':'} {session.lastActive}
                </p>
              </div>
              <Button variant="outline">{ACTIVE_SESSIONS_TEXT.LOGOUT}</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ActiveSessionsCard
