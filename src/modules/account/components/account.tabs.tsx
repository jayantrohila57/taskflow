import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Link } from '@/packages/next-intl/utils/navigation'
import { ChevronRight, CreditCardIcon, type LucideIcon } from 'lucide-react'
import { type ReactNode } from 'react'

// Define the type for each tab item
interface TabItem {
  link: string
  title: string
  icon: LucideIcon
}

interface DynamicVerticalTabsProps {
  children: ReactNode // Content to display below the tabs
}
export const data: TabItem[] = [
  {
    link: `/account/billing`,
    title: 'Billing',
    icon: CreditCardIcon,
  },
  {
    link: `/account/profile`,
    title: 'Profile',
    icon: CreditCardIcon,
  },
  {
    link: `/account/session`,
    title: 'Session',
    icon: CreditCardIcon,
  },
  {
    link: `/account/preferences`,
    title: 'Preferences',
    icon: CreditCardIcon,
  },
  {
    link: `/account/settings`,
    title: 'Settings',
    icon: CreditCardIcon,
  },
]

export default function AccountTabs({ children }: DynamicVerticalTabsProps) {
  return (
    <Card className="grid h-full w-full grid-cols-12">
      <CardHeader className="col-span-2 flex h-full w-full flex-col items-start justify-start gap-y-4 pr-0">
        {data.map((item) => (
          <Link
            href={item.link}
            key={item.link}
            className="w-full"
          >
            <Button
              variant={'outline'}
              className="flex h-12 w-full items-center justify-start gap-2"
            >
              <>
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </>
              <ChevronRight className="ml-auto h-4 w-4" />
            </Button>
          </Link>
        ))}
      </CardHeader>
      <CardContent className="col-span-9 grid h-full max-h-[70vh] w-full grid-cols-1 gap-4 overflow-scroll pl-0">
        {children}
      </CardContent>
    </Card>
  )
}
