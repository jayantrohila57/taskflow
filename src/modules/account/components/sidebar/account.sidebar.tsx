'use client'

import * as React from 'react'
import { z } from 'zod'

import { NavMain } from '@/components/shared/dashboard/nav-main'
import { NavSecondary } from '@/components/shared/dashboard/nav-secondary'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'

import { LayoutDashboardIcon, UserIcon } from 'lucide-react'
import { NavAccounts } from './account.side-list'

const navItemSchema = z.object({
  title: z.string(),
  url: z.string(), // Modified to accept locale in the URL
})

const navMainSchema = z.object({
  title: z.string(),
  url: z.string(), // Modified to accept locale in the URL
  icon: z.any(),
  isActive: z.boolean().optional(),
  items: z.array(navItemSchema),
})

const navSecondarySchema = z.object({
  title: z.string(),
  url: z.string(), // Modified to accept locale in the URL
  icon: z.any(),
})

const accountSchema = z.object({
  name: z.string(),
  url: z.string(), // Modified to accept locale in the URL
  icon: z.any(),
})

export const dataSchema = z.object({
  navMain: z.array(navMainSchema),
  navSecondary: z.array(navSecondarySchema),
  accounts: z.array(accountSchema),
})

const data = {
  navMain: [
    {
      title: 'Account Overview',
      url: '/handler/account',
      icon: LayoutDashboardIcon,
      items: [],
    },
    {
      title: 'Account Details',
      url: '/handler/account', // Base URL for the Account section
      icon: UserIcon,
      isActive: true,
      items: [
        {
          title: 'Profile',
          url: '/handler/account/profile',
        },
        {
          title: 'Billing',
          url: '/handler/account/billing',
        },
        {
          title: 'Session',
          url: '/handler/account/session',
        },
        {
          title: 'Preference',
          url: '/handler/account/preference',
        },
        {
          title: 'Setting',
          url: '/handler/account/setting',
        },
        {
          title: 'Security',
          url: '/handler/account/security',
        },
        {
          title: 'Notification',
          url: '/handler/account/notification',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '/support', // Example support URL with locale
      icon: LayoutDashboardIcon, // Replace with appropriate icon
    },
    {
      title: 'Feedback',
      url: '/feedback', // Example feedback URL with locale
      icon: LayoutDashboardIcon, // Replace with appropriate icon
    },
  ],
  accounts: [
    {
      name: 'My Personal Account',
      url: '/handler/account?id=personal',
      icon: LayoutDashboardIcon, // Replace with appropriate icon
    },
    {
      name: 'Team Project Account',
      url: '/handler/account?id=team-project',
      icon: LayoutDashboardIcon, // Replace with appropriate icon
    },
    {
      name: 'Client Collaboration Account',
      url: '/handler/account?id=client-collab',
      icon: LayoutDashboardIcon, // Replace with appropriate icon
    },
  ],
} satisfies z.infer<typeof dataSchema>

// You can now use 'data' which conforms to the dataSchema

export function AccountSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      {...props}
    >
      <SidebarHeader>{'Account'}</SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavAccounts accounts={data?.accounts} />
        <NavSecondary
          groupLabel="blabla"
          items={data.navSecondary}
          className="mt-auto"
        />
      </SidebarContent>{' '}
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
