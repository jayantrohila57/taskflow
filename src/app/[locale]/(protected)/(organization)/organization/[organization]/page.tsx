import { getTranslations } from 'next-intl/server'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { auth } from '@/packages/next-auth'
import { api, HydrateClient } from '@/packages/trpc/server'
import type { Locale } from 'next-intl'

interface PageProps {
  params: Promise<{
    locale: Locale
    org: string
  }>
}

export default async function OrganizationPage({ params }: PageProps) {
  const { locale, org } = await params
  const session = await auth()
  const { data } = await api.organization.getById({
    id: org,
  })
  const t = await getTranslations('ORGANIZATION')

  return (
    <HydrateClient>
      <Card className="h-[89.5vh] overflow-hidden">
        <CardHeader>
          <CardTitle>{t('ORG_PAGE_TITLE')}</CardTitle>
          <CardDescription>{t('ORG_PAGE_DESC')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[78vh] w-full pr-4">
            <div className="grid h-full w-full grid-cols-4 grid-rows-2 gap-4">
              <pre>{JSON.stringify({ data, session, locale }, null, 2)}</pre>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </HydrateClient>
  )
}
