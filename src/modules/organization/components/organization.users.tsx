import EmptyOrganizationState from './empty/organization.empty-list'
import { api } from '@/packages/trpc/server'
import { DataTable } from './table/data-table'
import { columns } from './table/data-table-column'
import { Card, CardContent } from '@/components/ui/card'

export default async function OrganizationUsers() {
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
