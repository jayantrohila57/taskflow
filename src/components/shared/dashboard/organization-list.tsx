// components/organization-list.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Organization } from '@prisma/client'

interface OrganizationListProps {
  organizations: Organization[]
}

const OrganizationList: React.FC<OrganizationListProps> = ({ organizations = [] }) => {
  return (
    <div className="flex flex-col space-y-4">
      {organizations.map((org) => (
        <Card key={org?.id}>
          <CardHeader>
            <CardTitle>{org?.title}</CardTitle>
            <CardDescription>{org?.slug}</CardDescription>
          </CardHeader>
          <CardContent>
            {org?.description && <p className="text-muted-foreground text-sm">{org?.description}</p>}
            {/* Add more organization details as needed */}
            <div className="mt-2 text-xs text-gray-500">{org?.createdAt.toLocaleDateString()}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default OrganizationList
