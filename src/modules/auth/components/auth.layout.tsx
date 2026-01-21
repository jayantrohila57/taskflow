import { Breadcrumbs } from '@/components/shared/dashboard/breadcrumbs'
import GoBackButton from '@/components/shared/dashboard/go-back'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import ScrumBoardIcon from '@/resources/assets/svg/scrum-board'

interface AuthPageLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ children, title, description }) => {
  return (
    <Card className="flex h-full w-full flex-col gap-4 border-none bg-transparent p-0 backdrop-blur-none">
      <CardHeader className="flex flex-row items-center gap-4 p-0">
        <GoBackButton />
        <Breadcrumbs className="" />
      </CardHeader>
      <CardContent className="grid h-full w-full grid-cols-2 gap-4 overflow-hidden overflow-y-auto p-0 sm:grid-cols-2 md:grid-cols-7">
        <div className="col-span-5 hidden h-full w-full items-center justify-center overflow-hidden rounded-xl border backdrop-blur-xs sm:hidden md:flex">
          <div className="relative flex h-full w-full flex-col items-center justify-center bg-transparent p-10">
            <ScrumBoardIcon className="h-auto w-auto" />
            <h1 className="mt-4 text-3xl font-bold">{'TaskFlow'}</h1>
            <p className="mt-2 text-lg">{'Your all-in-one task management solution.'}</p>
          </div>
        </div>
        <Card className="bg-card/20 col-span-2 flex h-full w-full flex-col items-center justify-between gap-4 backdrop-blur-xs">
          <CardHeader className="flex aspect-[5/1] h-20 w-full flex-col items-start justify-start text-left">
            <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
            <CardDescription className="text-sm md:text-base">{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex h-full w-full flex-col justify-center gap-4">{children}</CardContent>
          <CardFooter className="flex h-auto w-full flex-col justify-center gap-4"></CardFooter>
        </Card>
      </CardContent>
    </Card>
  )
}

export default AuthPageLayout
