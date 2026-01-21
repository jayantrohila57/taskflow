'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const LOGIN_HISTORY_TEXT = {
  TITLE: 'LOGIN_HISTORY',
  LAST_LOGIN: 'LAST_LOGIN',
  IP_ADDRESS: 'IP_ADDRESS',
  DEVICE: 'DEVICE',
  VIEW_FULL_HISTORY: 'VIEW_FULL_HISTORY',
}

const LOGIN_HISTORY_DETAILS = {
  lastLogin: '2023-05-15 14:30:00 UTC',
  ipAddress: '192.168.1.1',
  device: 'MacBook Pro (Chrome)',
}

const LoginHistoryCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{LOGIN_HISTORY_TEXT.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm">
            <p>
              <strong>
                {LOGIN_HISTORY_TEXT.LAST_LOGIN}
                {':'}
              </strong>{' '}
              {LOGIN_HISTORY_DETAILS.lastLogin}
            </p>
            <p>
              <strong>
                {LOGIN_HISTORY_TEXT.IP_ADDRESS}
                {':'}
              </strong>{' '}
              {LOGIN_HISTORY_DETAILS.ipAddress}
            </p>
            <p>
              <strong>
                {LOGIN_HISTORY_TEXT.DEVICE}
                {':'}
              </strong>{' '}
              {LOGIN_HISTORY_DETAILS.device}
            </p>
          </div>
          <Button variant="outline">{LOGIN_HISTORY_TEXT.VIEW_FULL_HISTORY}</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginHistoryCard
