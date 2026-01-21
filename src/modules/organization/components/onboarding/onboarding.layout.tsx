import { Breadcrumbs } from '@/components/shared/dashboard/breadcrumbs'
import GoBackButton from '@/components/shared/dashboard/go-back'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import OnboardingSteps from './onboarding.step-0'
import { Separator } from '@/components/ui/separator'
import OrgTroubleshootingAlert from './onboarding.info'

interface OnboardingPageLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

const OnboardingPageLayout: React.FC<OnboardingPageLayoutProps> = ({ children, title, description }) => {
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
        <CardContent className="grid h-full w-full grid-cols-10 items-start justify-start gap-4">
          <Card className="col-span-2 hidden h-full w-full items-start justify-start overflow-hidden sm:hidden md:flex">
            <CardContent>
              <OnboardingSteps />
            </CardContent>
          </Card>
          <div className="col-span-8">{children}</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OnboardingPageLayout
