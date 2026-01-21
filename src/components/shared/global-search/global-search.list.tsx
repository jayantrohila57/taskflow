'use client'

import { FileText, HelpCircle, Home, Settings, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

const groups = [
  {
    heading: 'Dashboard',
    items: [
      {
        name: 'Dashboard Overview',
        icon: Home,
        path: '/dashboard',
        description: 'View your dashboard',
      },
      {
        name: 'Active Projects',
        icon: FileText,
        path: '/dashboard/projects?status=active',
        description: 'View active projects',
      },
      {
        name: 'Archived Projects',
        icon: FileText,
        path: '/dashboard/projects?status=archived',
        description: 'View archived projects',
      },
      {
        name: 'Create Project',
        icon: FileText,
        path: '/dashboard/projects/create',
        description: 'Create a new project',
      },
    ],
  },
  {
    heading: 'Tasks',
    items: [
      {
        name: 'My Tasks',
        icon: FileText,
        path: '/dashboard/tasks?assignee=me',
        description: 'View your assigned tasks',
      },
      {
        name: 'Team Tasks',
        icon: FileText,
        path: '/dashboard/tasks?assignee=team',
        description: 'View team tasks',
      },
      {
        name: 'Completed Tasks',
        icon: FileText,
        path: '/dashboard/tasks?assignee=me&status=completed',
        description: 'View completed tasks',
      },
    ],
  },
  {
    heading: 'Users',
    items: [
      {
        name: 'User Profile',
        icon: User,
        path: '/dashboard/user/profile',
        description: 'View user profile',
      },
      {
        name: 'User Settings',
        icon: Settings,
        path: '/dashboard/user/settings',
        description: 'Manage user settings',
      },
      {
        name: 'Activity Log',
        icon: FileText,
        path: '/dashboard/user/activity',
        description: 'View activity history',
      },
    ],
  },
  {
    heading: 'Account',
    items: [
      {
        name: 'Account Profile',
        icon: User,
        path: '/dashboard/account/profile',
        description: 'Manage account profile',
      },
      {
        name: 'Billing',
        icon: Settings,
        path: '/dashboard/account/billing',
        description: 'Manage billing settings',
      },
      {
        name: 'Subscription',
        icon: Settings,
        path: '/dashboard/account/subscription',
        description: 'Manage subscription',
      },
    ],
  },
  {
    heading: 'Settings',
    items: [
      {
        name: 'General Settings',
        icon: Settings,
        path: '/dashboard/settings',
        description: 'Manage general settings',
      },
      {
        name: 'Privacy Settings',
        icon: Settings,
        path: '/dashboard/privacy',
        description: 'Manage privacy settings',
      },
      {
        name: 'Notifications',
        icon: Settings,
        path: '/dashboard/notification',
        description: 'Manage notifications',
      },
    ],
  },
  {
    heading: 'Support & Help',
    items: [
      {
        name: 'Support',
        icon: HelpCircle,
        path: '/dashboard/support',
        description: 'Get help and support',
      },
      {
        name: 'Feedback',
        icon: HelpCircle,
        path: '/dashboard/feedback',
        description: 'Provide feedback',
      },
    ],
  },
  {
    heading: 'Projects',
    items: [
      {
        name: 'Website Redesign',
        icon: FileText,
        path: '/dashboard/projects?id=website-redesign',
        description: 'Website redesign project',
      },
      {
        name: 'CRM Integration',
        icon: FileText,
        path: '/dashboard/projects?id=crm-integration',
        description: 'CRM integration project',
      },
      {
        name: 'Onboarding Flow',
        icon: FileText,
        path: '/dashboard/projects?id=onboarding-flow',
        description: 'User onboarding project',
      },
    ],
  },
]

interface CommandMenuProps {
  onSelect: (path: string) => void
  isOpen: boolean
  setIsOpen: (state: boolean) => void
}

export default function GlobalSearchList({ onSelect, isOpen, setIsOpen }: CommandMenuProps) {
  const [search, setSearch] = useState('')
  const t = useTranslations()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [setIsOpen])

  const filteredGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="border-b">
        <CommandInput
          autoFocus
          placeholder="Type a command or search..."
          value={search}
          onValueChange={setSearch}
        />
      </div>
      <CommandList className="p-2">
        {filteredGroups.length === 0 && <CommandEmpty>{t('COMMON.NO_RESULT')}</CommandEmpty>}
        {filteredGroups.map((group) => (
          <CommandGroup
            key={group.heading}
            heading={group.heading}
          >
            {group.items.map((item) => (
              <CommandItem
                key={item.name}
                onSelect={() => onSelect(item.path)}
              >
                <div className="flex aspect-square h-10 w-10 items-center justify-center">
                  <item.icon
                    size={16}
                    strokeWidth={2}
                    className="opacity-60"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex-grow">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-muted-foreground text-sm">{item.description}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
