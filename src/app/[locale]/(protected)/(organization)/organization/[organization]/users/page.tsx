import { getTranslations } from 'next-intl/server'

import GoBackButton from '@/components/shared/dashboard/go-back'
import ShareButton from '@/components/shared/layout/share-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { DataTable } from '@/modules/user/components/table/data-table'
import { columns } from '@/modules/user/components/table/data-table-column'
import { api } from '@/packages/trpc/server'

export default async function UserPageComponent() {
  const { data } = await api.user.getUsers({})
  const users = data?.items ?? []
  const t = await getTranslations('ORGANIZATION')

  return (
    <Tabs defaultValue="1">
      <div className="grid h-full w-full grid-cols-12 gap-2">
        <Card className="col-span-12 h-[89.5vh] overflow-hidden overflow-y-scroll rounded-xl text-wrap break-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex h-full w-full flex-row items-center justify-end gap-4">
              <GoBackButton />
              <div className="h-full w-full">
                <CardTitle>{t('USER_TITLE')}</CardTitle>
                <CardDescription>{t('USER_DESC')}</CardDescription>
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
                data={users}
                columns={columns}
              />
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </Tabs>
  )
}
