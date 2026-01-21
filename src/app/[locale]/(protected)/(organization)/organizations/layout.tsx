import React from 'react'

import Shell from '@/components/shared/shell/shell'
import { Breadcrumbs } from '@/components/shared/dashboard/breadcrumbs'
import GlobalSearch from '@/components/shared/global-search/global-search'
import { HeaderActions } from '@/components/shared/layout/header.actions'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import SignoutWithGithub from '@/modules/auth/components/sign-out/auth.signout'
import { OrganizationSidebar } from '@/modules/organization/components/sidebar/organization.sidebar'
import BgGridPattern from '@/components/shared/shell/bg-grid-pattern'
import type { Locale } from 'next-intl'

interface OrganizationLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function OrganizationLayout({ children, params }: OrganizationLayoutProps) {
  const { locale } = await params
  return (
    <Shell>
      <SidebarProvider>
        <OrganizationSidebar />
        <SidebarInset>
          <div className="sticky top-0 flex h-16 shrink-0 items-center gap-2">
            <div className="flex w-full items-center justify-between gap-2 px-4">
              <div className="flex w-full flex-row items-center justify-start gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 h-4"
                />
                <Breadcrumbs />
              </div>
              <div className="flex w-full flex-row items-center justify-end gap-4">
                <GlobalSearch />
                <HeaderActions />
                <SignoutWithGithub />
              </div>
            </div>
          </div>
          <Shell.Main
            variant="dashboard"
            padding="none"
            scale={'dashboard'}
          >
            {children}
            <BgGridPattern />
          </Shell.Main>
        </SidebarInset>
      </SidebarProvider>
    </Shell>
  )
}
