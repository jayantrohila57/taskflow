import GoBackButton from '@/components/shared/dashboard/go-back'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

interface AccountPageLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

const AccountPageLayout: React.FC<AccountPageLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="grid h-full w-full grid-cols-12 gap-2">
      <Card className="col-span-12 h-[89.5vh] overflow-hidden overflow-y-scroll rounded-xl text-wrap break-all">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex h-full w-full flex-row items-center justify-end gap-4">
            <GoBackButton />
            <div className="h-full w-full">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-full w-full">{children}</CardContent>
      </Card>
    </div>
  )
}

export default AccountPageLayout
