'use client'
import { AudioWaveform, Command, GalleryVerticalEnd, LayoutDashboardIcon, Shield, User } from 'lucide-react'
import * as React from 'react'
import { z } from 'zod'

import { NavMain } from '@/components/shared/dashboard/nav-main'
import { NavUser } from '@/components/shared/dashboard/nav-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import HeaderLogo from '../layout/header.logo'

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().url(),
})

const orgSchema = z.object({
  name: z.string(),
  logo: z.any(),
  plan: z.string(),
})

const navItemSchema = z.object({
  title: z.string(),
  url: z.string().url(),
})

const navMainSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  icon: z.any(),
  isActive: z.boolean().optional(),
  items: z.array(navItemSchema),
})

export const dataSchema = z.object({
  user: userSchema,
  organizations: z.array(orgSchema),
  navMain: z.array(navMainSchema),
})

const data = {
  user: {
    name: 'Jayant Rohila',
    email: 'jrohila55@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  organizations: [
    {
      name: 'Development Organization',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Marketing Organization',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Support Organization',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/sys/dashboard',
      icon: LayoutDashboardIcon,
      items: [],
      isActive: true,
    },
    {
      title: 'Users',
      url: '/sys/dashboard/users',
      icon: User,
      items: [
        {
          title: 'Requested users',
          url: '/sys/dashboard/users/requested',
        },
        {
          title: 'Invite user',
          url: '/sys/dashboard/users/invite',
        },
      ],
    },
    {
      title: 'Sessions',
      url: '/sys/dashboard/session',
      icon: Shield,
      items: [],
    },
  ],
} satisfies z.infer<typeof dataSchema>

export function AdminSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user:
    | {
        userId: string
        name: string
        email: string
        image: string
      }
    | undefined
}) {
  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      {...props}
    >
      <SidebarHeader>
        <HeaderLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          groupLabel="name"
          items={data.navMain}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
