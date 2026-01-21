import { getTranslations } from 'next-intl/server'

import GoBackButton from '@/components/shared/dashboard/go-back'
import ShareButton from '@/components/shared/layout/share-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { DataTable } from '@/modules/organization/components/table/data-table'
import { columns } from '@/modules/organization/components/table/data-table-column'
// import { api } from '@/packages/trpc/server'

export default async function OrganizationPageComponent() {
  // const { data } = await api.organization.get({})
  const t = await getTranslations()

  return (
    <Tabs defaultValue="1">
      <div className="grid h-full w-full grid-cols-12 gap-2">
        <Card className="col-span-9 h-[89.5vh] overflow-hidden overflow-y-scroll rounded-xl text-wrap break-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex h-full w-full flex-row items-center justify-end gap-4">
              <GoBackButton />
              <div className="h-full w-full">
                <CardTitle>{t('ORGANIZATION.ORGANIZATION_NAME')}</CardTitle>
                <CardDescription>{t('ORGANIZATION.CREATE_ORGANIZATION_DESCRIPTION')}</CardDescription>
              </div>
            </div>
            <div className="flex h-full w-full flex-row items-center justify-end gap-4">
              <ShareButton />
            </div>
          </CardHeader>
          <Separator />
          <CardContent>
            <TabsContent
              className="h-fit w-full"
              value="1"
            >
              <DataTable
                data={[]}
                columns={columns}
              />
            </TabsContent>
          </CardContent>
        </Card>
        <div className="col-span-3 h-full w-full">
          <Card className="h-[89.5vh] overflow-hidden overflow-y-scroll rounded-xl text-wrap break-all"></Card>
        </div>
      </div>
    </Tabs>
  )
}
