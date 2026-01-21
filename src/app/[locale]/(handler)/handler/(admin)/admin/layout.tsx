import { AdminSidebar } from '@/components/shared/dashboard/admin-sidebar'
import { Breadcrumbs } from '@/components/shared/dashboard/breadcrumbs'
import GlobalSearch from '@/components/shared/global-search/global-search'
import { HeaderActions } from '@/components/shared/layout/header.actions'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import SignoutWithGithub from '@/modules/auth/components/sign-out/auth.signout'
import { auth } from '@/packages/next-auth'
import { HydrateClient } from '@/packages/trpc/server'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <HydrateClient>
      <SidebarProvider>
        <AdminSidebar user={session?.user} />
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
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </HydrateClient>
  )
}
