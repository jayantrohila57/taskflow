'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Building } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from '@/packages/next-intl/utils/navigation'

interface Organization {
  id: string
  name: string
  description: string
  logo?: string
  memberCount: number
}
const ORGANIZATION_LIST_TEXT = {
  NO_ORGANIZATIONS_TITLE: 'No organizations found',
  NO_ORGANIZATIONS_DESCRIPTION: "You don't have any organizations yet. Create one to get started.",
  CREATE_ORGANIZATION_BUTTON: 'Create Organization',
  MEMBERS: 'members',
  PREVIOUS: 'Previous',
  NEXT: 'Next',
  PAGE: 'Page',
  OF: 'of',
}

// Mock data - in a real app, this would come from an API
const mockOrganizations: Organization[] = [
  {
    id: 'org-1',
    name: 'Acme Inc',
    description: 'Software development company',
    logo: '/placeholder.svg?height=40&width=40',
    memberCount: 24,
  },
  {
    id: 'org-2',
    name: 'Globex Corporation',
    description: 'Global technology solutions',
    logo: '/placeholder.svg?height=40&width=40',
    memberCount: 56,
  },
  {
    id: 'org-3',
    name: 'Initech',
    description: 'Enterprise software solutions',
    logo: '/placeholder.svg?height=40&width=40',
    memberCount: 12,
  },
  {
    id: 'org-4',
    name: 'Umbrella Corp',
    description: 'Pharmaceutical research',
    logo: '/placeholder.svg?height=40&width=40',
    memberCount: 78,
  },
  {
    id: 'org-5',
    name: 'Stark Industries',
    description: 'Advanced technology and innovation',
    logo: '/placeholder.svg?height=40&width=40',
    memberCount: 42,
  },
  {
    id: 'org-6',
    name: 'Wayne Enterprises',
    description: 'Technology and philanthropy',
    logo: '/placeholder.svg?height=40&width=40',
    memberCount: 35,
  },
]

export function OrganizationList() {
  const [page, setPage] = useState(1)
  const pageSize = 3
  const totalPages = Math.ceil(mockOrganizations.length / pageSize)

  const paginatedOrganizations = mockOrganizations.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="space-y-6">
      {paginatedOrganizations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Building className="text-muted-foreground h-10 w-10" />
          <h3 className="mt-4 text-lg font-semibold">{ORGANIZATION_LIST_TEXT.NO_ORGANIZATIONS_TITLE}</h3>
          <p className="text-muted-foreground mt-2 text-sm">{ORGANIZATION_LIST_TEXT.NO_ORGANIZATIONS_DESCRIPTION}</p>
          <Button
            asChild
            className="mt-4"
          >
            <Link href={`/create`}>{ORGANIZATION_LIST_TEXT.CREATE_ORGANIZATION_BUTTON}</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="divide-y rounded-md border">
            {paginatedOrganizations.map((org) => (
              <Link
                key={org.id}
                href={`/organizations/${org.id}`}
                className="hover:bg-muted/50 flex items-center gap-4 p-4 transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={org.logo || '/placeholder.svg'}
                    alt={org.name}
                  />
                  <AvatarFallback>{org.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium">{org.name}</h3>
                  <p className="text-muted-foreground truncate text-sm">{org.description}</p>
                </div>
                <div className="text-muted-foreground text-sm">
                  {org.memberCount} {ORGANIZATION_LIST_TEXT.MEMBERS}
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                {ORGANIZATION_LIST_TEXT.PREVIOUS}
              </Button>
              <span className="text-muted-foreground text-sm">
                {ORGANIZATION_LIST_TEXT.PAGE} {page} {ORGANIZATION_LIST_TEXT.OF} {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                {ORGANIZATION_LIST_TEXT.NEXT}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
