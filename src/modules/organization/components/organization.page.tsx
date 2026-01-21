import EmptyOrganizationState from './empty/organization.empty-list'
import { api } from '@/packages/trpc/server'
import { DataTable } from './table/data-table'
import { columns } from './table/data-table-column'
import { Card, CardContent } from '@/components/ui/card'

export const DASHBOARD_TEXT = {
  TITLE: 'Organizations',
  SUBTITLE: 'Manage your organizations and teams.',
  JOIN_BUTTON: 'Join Organization',
  CREATE_BUTTON: 'Create Organization',
  ORGANIZATIONS_TITLE: 'Your Organizations',
  ORGANIZATIONS_DESCRIPTION: 'Organizations you are a member of.',
  QUICK_ACTIONS_TITLE: 'Quick Actions',
  QUICK_ACTIONS_DESCRIPTION: 'Get started with these common tasks.',
  CREATE_ORG_CARD_TITLE: 'Create Organization',
  CREATE_ORG_CARD_DESCRIPTION: 'Create a new organization for your team.',
  JOIN_ORG_CARD_TITLE: 'Join Organization',
  JOIN_ORG_CARD_DESCRIPTION: 'Join an existing organization with an invite code.',
  SETTINGS_CARD_TITLE: 'Settings',
  SETTINGS_CARD_DESCRIPTION: 'Manage your account settings and preferences.',
  VIEW_DETAILS: 'View Details',
}
export const DEFAULT_TAB = {
  MY_ORGANIZATION: 'tab-1',
  INVITATION: 'tab-2',
  PENDING_REQUESTS: 'tab-3',
}

type Props = typeof DEFAULT_TAB

export default async function DashboardPage({ defaultTab }: { defaultTab?: keyof Props }) {
  const organizationData = await api.organization.get({})

  return (
    <Card>
      <CardContent>
        {organizationData?.success ? (
          <DataTable
            data={(organizationData?.data?.organizations ?? []).map((org) => ({
              name: org.title,
              id: org.id,
              createdAt: new Date(),
              updatedAt: new Date(),
              description: org.description ?? undefined,
            }))}
            columns={columns}
          />
        ) : (
          <EmptyOrganizationState />
        )}
      </CardContent>
    </Card>
  )
}
