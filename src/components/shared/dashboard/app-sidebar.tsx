'use client'

import {
  AudioWaveform,
  CheckSquare,
  Command,
  FrameIcon,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  LifeBuoy,
  Monitor,
  Send,
  Server,
  Settings2,
  User,
  UserPlus,
} from 'lucide-react'
import * as React from 'react'
import { z } from 'zod'

import { NavMain } from '@/components/shared/dashboard/nav-main'
import { NavProjects } from '@/components/shared/dashboard/nav-projects'
import { NavSecondary } from '@/components/shared/dashboard/nav-secondary'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'

import { TeamSwitcher } from './team-switcher'

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().url(),
})

const teamSchema = z.object({
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
  user: userSchema,
  teams: z.array(teamSchema),
  navMain: z.array(navMainSchema),
  navSecondary: z.array(navSecondarySchema),
  projects: z.array(projectSchema),
})

const data = {
  user: {
    name: 'Jayant Rohila',
    email: 'jrohila55@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Development Team',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Marketing Team',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Support Team',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboardIcon,
      items: [],
      isActive: true,
    },
    {
      title: 'Projects',
      url: '/dashboard/projects',
      icon: FrameIcon,
      isActive: true,
      items: [
        {
          title: 'Active Projects',
          url: '/dashboard/projects?status=active',
        },
        {
          title: 'Archived Projects',
          url: '/dashboard/projects?status=archived',
        },
        {
          title: 'Create New Project',
          url: '/dashboard/projects/create',
        },
      ],
    },
    {
      title: 'Tasks',
      url: '/dashboard/tasks',
      icon: CheckSquare,
      items: [
        {
          title: 'My Tasks',
          url: '/dashboard/tasks?assignee=me',
        },
        {
          title: 'Team Tasks',
          url: '/dashboard/tasks?assignee=team',
        },
        {
          title: 'Completed Tasks',
          url: '/dashboard/tasks?assignee=me&status=completed',
        },
      ],
    },
    {
      title: 'Users',
      url: '/dashboard/users',
      icon: User,
      items: [
        {
          title: 'Profile',
          url: '/dashboard/user/profile',
        },
        {
          title: 'Settings',
          url: '/dashboard/user/settings',
        },
        {
          title: 'Activity',
          url: '/dashboard/user/activity',
        },
      ],
    },
    {
      title: 'Account',
      url: '/dashboard/account',
      icon: User,
      items: [
        {
          title: 'Profile',
          url: '/dashboard/account/profile',
        },
        {
          title: 'Billing',
          url: '/dashboard/account/billing',
        },
        {
          title: 'Subscription',
          url: '/dashboard/account/subscription',
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
        },
        {
          title: 'Privacy',
          url: '/dashboard/privacy',
        },
        {
          title: 'Notifications',
          url: '/dashboard/notification',
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
  projects: [
    {
      name: 'Website Redesign',
      url: '/dashboard/projects?id=website-redesign',
      icon: Monitor,
    },
    {
      name: 'CRM Integration',
      url: '/dashboard/projects?id=crm-integration',
      icon: Server,
    },
    {
      name: 'Onboarding Flow',
      url: '/dashboard/projects?id=onboarding-flow',
      icon: UserPlus,
    },
  ],
} satisfies z.infer<typeof dataSchema>

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data?.projects} />
        <NavSecondary
          groupLabel="scdvdsv"
          items={data.navSecondary}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
