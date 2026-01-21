import { getTranslations } from 'next-intl/server'

import GoBackButton from '@/components/shared/dashboard/go-back'
import ShareButton from '@/components/shared/layout/share-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/modules/project/components/table/data-table'
import { columns } from '@/modules/project/components/table/data-table-column'
import { api } from '@/packages/trpc/server'

export default async function ProjectPageComponent() {
  const { data } = await api.project.getProjects({})
  const projects = data?.items
  const t = await getTranslations('PROJECT')

  return (
    <div className="grid h-full w-full grid-cols-12 gap-2">
      <Card className="col-span-12 h-[89.5vh] overflow-hidden overflow-y-scroll rounded-xl text-wrap break-all">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex h-full w-full flex-row items-center justify-end gap-4">
            <GoBackButton />
            <div className="h-full w-full">
              <CardTitle>{t('PROJECT_TITLE')}</CardTitle>
              <CardDescription>{t('PROJECT_DESC')}</CardDescription>
            </div>
          </div>
          <div className="flex h-full w-full flex-row items-center justify-end gap-4">
            <ShareButton />
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <DataTable
            data={projects ?? []}
            columns={columns}
          />
        </CardContent>
      </Card>
    </div>
  )
}
