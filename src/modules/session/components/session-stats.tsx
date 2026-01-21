import { Activity, Clock, Shield, Users } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const STRINGS = {
  ACTIVE_SESSIONS: 'Active Sessions',
  REVOKED_SESSIONS: 'Revoked Sessions',
  AVG_SESSION_DURATION: 'Avg. Session Duration',
  SESSION_ACTIVITY: 'Session Activity',
  FROM_LAST_WEEK: 'from last week',
}

// This would typically come from a server component or server action
export const sessionStats = {
  activeSessions: 245,
  activeSessionsChange: 12,
  revokedSessions: 18,
  revokedSessionsChange: -5,
  avgSessionDuration: '3h 24m',
  avgSessionDurationChange: 8,
  sessionActivity: '1.2k',
  sessionActivityChange: 15,
}

export function SessionStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{STRINGS.ACTIVE_SESSIONS}</CardTitle>
          <Users className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sessionStats.activeSessions}</div>
          <p className="text-muted-foreground text-xs">
            {sessionStats.activeSessionsChange > 0
              ? `+${sessionStats.activeSessionsChange}% ${STRINGS.FROM_LAST_WEEK}`
              : `${sessionStats.activeSessionsChange}% ${STRINGS.FROM_LAST_WEEK}`}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{STRINGS.REVOKED_SESSIONS}</CardTitle>
          <Shield className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sessionStats.revokedSessions}</div>
          <p className="text-muted-foreground text-xs">
            {sessionStats.revokedSessionsChange > 0
              ? `+${sessionStats.revokedSessionsChange}% ${STRINGS.FROM_LAST_WEEK}`
              : `${sessionStats.revokedSessionsChange}% ${STRINGS.FROM_LAST_WEEK}`}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{STRINGS.AVG_SESSION_DURATION}</CardTitle>
          <Clock className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sessionStats.avgSessionDuration}</div>
          <p className="text-muted-foreground text-xs">
            {sessionStats.avgSessionDurationChange > 0
              ? `+${sessionStats.avgSessionDurationChange}% ${STRINGS.FROM_LAST_WEEK}`
              : `${sessionStats.avgSessionDurationChange}% ${STRINGS.FROM_LAST_WEEK}`}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{STRINGS.SESSION_ACTIVITY}</CardTitle>
          <Activity className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sessionStats.sessionActivity}</div>
          <p className="text-muted-foreground text-xs">
            {sessionStats.sessionActivityChange > 0
              ? `+${sessionStats.sessionActivityChange}% ${STRINGS.FROM_LAST_WEEK}`
              : `${sessionStats.sessionActivityChange}% ${STRINGS.FROM_LAST_WEEK}`}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
