import { Suspense } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SessionStats } from '@/modules/session/components/session-stats'
import { SessionsTable } from '@/modules/session/components/sessions-table'
import { SessionsTableSkeleton } from '@/modules/session/components/sessions-table-skeleton'

export default function SessionManagementPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{'Session Management'}</CardTitle>
        <CardDescription>{'View and manage user sessions across your application.'}</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div className="bg-muted h-24 animate-pulse rounded-lg" />}>
          <SessionStats />
        </Suspense>
      </CardContent>
      <CardContent>
        <Suspense fallback={<SessionsTableSkeleton />}>
          <SessionsTable />
        </Suspense>
      </CardContent>
    </Card>
  )
}
