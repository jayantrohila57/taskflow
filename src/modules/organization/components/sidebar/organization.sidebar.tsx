'use client'

import * as React from 'react'
import { z } from 'zod'

import { NavMain } from '@/components/shared/dashboard/nav-main'
import { NavSecondary } from '@/components/shared/dashboard/nav-secondary'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar'

import {
  LayoutDashboardIcon,
  Settings2,
  LifeBuoy,
  Send,
  Monitor,
  Server,
  UserPlus,
  List,
  Mail,
  UserCheck,
  PlusCircle,
  Briefcase,
  type LucideIcon,
  Lock,
  Settings,
  Bell,
  Zap,
} from 'lucide-react'
import { NavOrganizations } from './organization.side-list'
import { NavUser } from '@/components/shared/dashboard/nav-user'

const navItemSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  icon: z.custom<LucideIcon>(),
})

const navMainSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  icon: z.any(),
  isActive: z.boolean().optional(),
  items: z.array(navItemSchema),
})

const navSecondarySchema = z.object({
  title: z.string(),
  url: z.string().url(),
  icon: z.any(),
})

const projectSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  icon: z.any(),
})

export const dataSchema = z.object({
  navMain: z.array(navMainSchema),
  navMain2: z.array(navMainSchema),
  navSecondary: z.array(navSecondarySchema),
  organizations: z.array(projectSchema),
})

const data = {
  navMain: [
    {
      title: 'Get Started',
      url: '/organizations/get-started',
      icon: Zap,
      items: [],
      isActive: true,
    },
    {
      title: 'Overview',
      url: '/organizations',
      icon: LayoutDashboardIcon,
      items: [],
      isActive: true,
    },
  ],
  navMain2: [
    {
      title: 'Organizations',
      icon: Briefcase,
      url: '/organizations/list',
      isActive: true,
      items: [
        {
          title: 'All Organizations',
          url: '/organizations/list',
          icon: List,
        },
        {
          title: 'Create New Organization',
          url: '/organizations/create',
          icon: PlusCircle,
        },
      ],
    },
    {
      title: 'User Management',
      url: '/dashboard/user-management',
      icon: UserCheck,
      items: [
        {
          title: 'All Users',
          url: '/organizations/users',
          icon: UserCheck,
        },
        {
          title: 'Roles & Permissions',
          url: '/organizations/roles',
          icon: Lock,
        },
        {
          title: 'Invite Users',
          url: '/organizations/invitations',
          icon: UserPlus,
        },
      ],
    },
    {
      title: 'Roles & Permissions',
      url: '/dashboard/roles',
      icon: Lock,
      items: [
        {
          title: 'Manage Roles',
          url: '/organizations/manage-role',
          icon: Lock,
        },
        {
          title: 'Manage Permission',
          url: '/organizations/manage-permissions',
          icon: Lock,
        },
      ],
    },

    {
      title: 'Settings',
      url: '/dashboard/settings',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '/dashboard/settings',
          icon: Settings,
        },
        {
          title: 'Privacy',
          url: '/dashboard/privacy',
          icon: Lock,
        },
        {
          title: 'Notifications',
          url: '/dashboard/notification',
          icon: Bell,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '/dashboard/support',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '/dashboard/feedback',
      icon: Send,
    },
  ],
  organizations: [
    {
      name: 'Atlas Platform',
      url: '/dashboard/organizations?id=website-redesign',
      icon: Monitor,
    },
    {
      name: 'Phoenix Database',
      url: '/dashboard/organizations?id=crm-integration',
      icon: Server,
    },
    {
      name: 'Helios Gateway',
      url: '/dashboard/organizations?id=onboarding-flow',
      icon: UserPlus,
    },
  ],
} satisfies z.infer<typeof dataSchema>

export function OrganizationSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      {...props}
    >
      <SidebarHeader>
        <NavUser
          user={{
            email: 'test@test.com',
            image: 'https://github.com/shadcn.png',
            name: 'John Doe',
            userId: '123',
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          groupLabel="Main Navigation"
          items={data.navMain}
        />
        <NavMain
          groupLabel="Secondary Navigation"
          items={data.navMain2}
        />
        <NavOrganizations
          groupLabel="Organizations"
          organizations={data?.organizations}
        />
        <NavSecondary
          groupLabel="Support & Feedback"
          items={data.navSecondary}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
