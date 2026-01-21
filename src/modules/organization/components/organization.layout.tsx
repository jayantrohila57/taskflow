import { Breadcrumbs } from '@/components/shared/dashboard/breadcrumbs'
import GoBackButton from '@/components/shared/dashboard/go-back'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React from 'react'

interface OrganizationPageLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

const OrganizationPageLayout: React.FC<OrganizationPageLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="grid h-full w-full grid-cols-12 gap-2">
      <Card className="col-span-12 h-[89.5vh] overflow-hidden overflow-y-scroll rounded-none border-none bg-transparent p-0 text-wrap break-all shadow-none">
        <CardHeader className="flex flex-row items-center justify-between px-0">
          <div className="flex h-full w-full flex-row items-center justify-end gap-4">
            <GoBackButton />
            <div className="h-full w-full">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-full w-full px-0">{children}</CardContent>
      </Card>
    </div>
  )
}

export default OrganizationPageLayout
