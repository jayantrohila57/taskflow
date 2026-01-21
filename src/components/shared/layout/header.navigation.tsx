'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Link } from '@/packages/next-intl/utils/navigation'
import { PATH } from '@/resources/config/routes.config'
import { cn } from '@/lib/utils'
import React from 'react'
import { Home, HelpCircle, FileText, Info, MessageSquare, Contact, Shield, Cookie, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function NavigationHeader() {
  const t = useTranslations()

  const sections = [
    {
      label: t('NAVIGATION.MENU.HOME'),
      icon: Home,
      introTitle: t('NAVIGATION.HOME.PLATFORM_TITLE'),
      introDescription: t('NAVIGATION.HOME.PLATFORM_DESCRIPTION'),
      routes: [
        {
          title: t('NAVIGATION.HOME.ABOUT_US.TITLE'),
          icon: Info,
          href: PATH.PUBLIC.HOME.ABOUT_US,
          description: t('NAVIGATION.HOME.ABOUT_US.DESCRIPTION'),
        },
        {
          title: t('NAVIGATION.HOME.CONTACT_US.TITLE'),
          icon: Contact,
          href: PATH.PUBLIC.HOME.CONTACT_US,
          description: t('NAVIGATION.HOME.CONTACT_US.DESCRIPTION'),
        },
      ],
    },
    {
      label: t('NAVIGATION.MENU.SUPPORT'),
      icon: HelpCircle,
      introTitle: t('NAVIGATION.SUPPORT.CENTER_TITLE'),
      introDescription: t('NAVIGATION.SUPPORT.CENTER_DESCRIPTION'),
      routes: [
        {
          title: t('NAVIGATION.SUPPORT.ROOT.TITLE'),
          icon: HelpCircle,
          href: PATH.PUBLIC.SUPPORT.ROOT,
          description: t('NAVIGATION.SUPPORT.ROOT.DESCRIPTION'),
        },
        {
          title: t('NAVIGATION.SUPPORT.FAQ.TITLE'),
          icon: MessageSquare,
          href: PATH.PUBLIC.HOME.FREQUENTLY_ASKED_QUESTIONS,
          description: t('NAVIGATION.SUPPORT.FAQ.DESCRIPTION'),
        },
      ],
    },
    {
      label: t('NAVIGATION.MENU.LEGAL'),
      icon: FileText,
      introTitle: t('NAVIGATION.LEGAL.INFO_TITLE'),
      introDescription: t('NAVIGATION.LEGAL.INFO_DESCRIPTION'),
      routes: [
        {
          title: t('NAVIGATION.LEGAL.PRIVACY_POLICY.TITLE'),
          icon: Shield,
          href: PATH.PUBLIC.LEGAL.PRIVACY_POLICY,
          description: t('NAVIGATION.LEGAL.PRIVACY_POLICY.DESCRIPTION'),
        },
        {
          title: t('NAVIGATION.LEGAL.TERMS_CONDITIONS.TITLE'),
          icon: FileText,
          href: PATH.PUBLIC.LEGAL.TERMS_CONDITIONS,
          description: t('NAVIGATION.LEGAL.TERMS_CONDITIONS.DESCRIPTION'),
        },
        {
          title: t('NAVIGATION.LEGAL.COOKIES_SETTINGS.TITLE'),
          icon: Cookie,
          href: PATH.PUBLIC.LEGAL.COOKIES_SETTINGS,
          description: t('NAVIGATION.LEGAL.COOKIES_SETTINGS.DESCRIPTION'),
        },
      ],
    },
  ]
  return (
    <NavigationMenu className="bg-background ml-28 w-full rounded-full px-1 py-1">
      <NavigationMenuList>
        {sections.map((section) => (
          <NavigationMenuItem key={section.label}>
            <NavigationMenuTrigger>
              <span className="flex items-center gap-2">{section.label}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="grid h-full w-full items-start justify-start gap-3 p-4 md:w-[600px] lg:w-[800px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3 h-full">
                  <NavigationMenuLink asChild>
                    <a
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                      href={PATH.PUBLIC.HOME.ROOT}
                    >
                      <section.icon />
                      <div className="mt-4 mb-2 text-lg font-medium">{section.introTitle}</div>
                      <p className="text-muted-foreground text-sm leading-tight">{section.introDescription}</p>
                    </a>
                  </NavigationMenuLink>
                </li>
                {section.routes.map((route) => (
                  <ListItem
                    key={route.href}
                    title={route.title}
                    href={route.href}
                    icon={route.icon}
                  >
                    {route.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem>
          <Link
            href={PATH.PUBLIC.HOME.ROOT}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>{'Blog'}</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={PATH.PUBLIC.HOME.ROOT}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t('NAVIGATION.MENU.DOCUMENTATION')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { icon?: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li className="h-full">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
            className,
          )}
          {...props}
        >
          <div className="flex flex-row items-start justify-between gap-2 text-sm leading-none font-medium">
            <div className="flex w-full flex-row items-start justify-start gap-2">
              {Icon && <Icon className="h-4 w-4" />}
              {title}
            </div>
            <ChevronRight className="h-4 w-4" />
          </div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
