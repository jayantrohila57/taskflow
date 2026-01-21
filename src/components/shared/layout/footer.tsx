import { Button } from '@/components/ui/button'
import { Link } from '@/packages/next-intl/utils/navigation'
import {
  Facebook,
  Github,
  Instagram,
  Copyright,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  FileText,
  User,
  UserPlus,
  KeyRound,
  Home,
  Info,
  MessageSquare,
  Contact,
  Shield,
  Cookie,
} from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { PATH } from '@/resources/config/routes.config'

import { getTranslations } from 'next-intl/server'
import type { Locale } from 'next-intl'

interface PageProps {
  locale: Locale
}

export default async function Footer({ locale }: PageProps) {
  const t = await getTranslations({ locale })
  const SOCIAL_LINKS = [
    {
      name: t('FOOTER.SOCIAL.FACEBOOK'),
      icon: Facebook,
      href: PATH.SOCIAL.FACEBOOK,
    },
    {
      name: t('FOOTER.SOCIAL.TWITTER'),
      icon: Twitter,
      href: PATH.SOCIAL.TWITTER,
    },
    {
      name: t('FOOTER.SOCIAL.INSTAGRAM'),
      icon: Instagram,
      href: PATH.SOCIAL.INSTAGRAM,
    },
    {
      name: t('FOOTER.SOCIAL.LINKEDIN'),
      icon: Linkedin,
      href: PATH.SOCIAL.LINKEDIN,
    },
    { name: t('FOOTER.SOCIAL.GITHUB'), icon: Github, href: PATH.SOCIAL.GITHUB },
  ]

  const FOOTER_LINKS = [
    {
      title: t('FOOTER.COMPANY'),
      links: [
        { name: t('FOOTER.HOME'), icon: Home, href: PATH.PUBLIC.HOME.ROOT },
        {
          name: t('FOOTER.ABOUT_US'),
          icon: Info,
          href: PATH.PUBLIC.HOME.ABOUT_US,
        },
        {
          name: t('FOOTER.CONTACT_US'),
          icon: Contact,
          href: PATH.PUBLIC.HOME.CONTACT_US,
        },
        {
          name: t('FOOTER.FAQ'),
          icon: HelpCircle,
          href: PATH.PUBLIC.HOME.FREQUENTLY_ASKED_QUESTIONS,
        },
      ],
    },
    {
      title: t('FOOTER.SUPPORT'),
      links: [
        {
          name: t('FOOTER.HELP_CENTER'),
          icon: HelpCircle,
          href: PATH.PUBLIC.SUPPORT.ROOT,
        },
        {
          name: t('FOOTER.TICKETS'),
          icon: FileText,
          href: PATH.PUBLIC.SUPPORT.TICKETS.ROOT,
        },
        {
          name: t('FOOTER.CREATE_TICKET'),
          icon: MessageSquare,
          href: PATH.PUBLIC.SUPPORT.TICKETS.CREATE,
        },
      ],
    },
    {
      title: t('FOOTER.ACCOUNT'),
      links: [
        {
          name: t('FOOTER.SIGN_IN'),
          icon: User,
          href: PATH.PUBLIC.AUTH.SIGN_IN,
        },
        {
          name: t('FOOTER.SIGN_UP'),
          icon: UserPlus,
          href: PATH.PUBLIC.AUTH.SIGN_UP,
        },
        {
          name: t('FOOTER.FORGOT_PASSWORD'),
          icon: KeyRound,
          href: PATH.PUBLIC.AUTH.FORGOT_PASSWORD,
        },
      ],
    },
  ]

  const BOTTOM_LINKS = [
    { name: t('FOOTER.CONTACT'), icon: Contact, href: '/contact' },
    { name: t('FOOTER.TERMS_CONDITIONS'), icon: FileText, href: '/terms' },
    { name: t('FOOTER.PRIVACY_POLICY'), icon: Shield, href: '/privacy' },
    {
      name: t('FOOTER.COOKIE_SETTINGS'),
      icon: Cookie,
      href: PATH.PUBLIC.LEGAL.COOKIES_SETTINGS,
    },
  ]

  const CONTACT_INFO = [
    { icon: MapPin, name: t('FOOTER.ADDRESS') },
    { icon: Mail, name: t('FOOTER.EMAIL') },
    { icon: Phone, name: t('FOOTER.PHONE') },
  ]

  // Client component for collapsible sections on mobile
  interface FooterLink {
    name: string
    icon: React.ComponentType<{ className?: string }>
    href: string
  }

  interface FooterSectionProps {
    title: string
    links: FooterLink[]
  }

  const FooterSection = ({ title, links }: FooterSectionProps) => {
    return (
      <div className="space-y-4 py-4">
        <div className="flex items-center">
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        <ul className="space-y-4">
          {links.map((link: FooterLink, linkIndex: number) => (
            <li key={linkIndex}>
              <Link
                href={link.href}
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
              >
                <link.icon className="h-4 w-4" />
                <span className="text-sm">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      {/* Main Footer Content */}
      <Separator className="my-4" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
        {/* Company Info - Takes full width on mobile, then becomes a side column */}
        <div className="space-y-6 lg:col-span-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-md">
              <span className="text-primary-foreground font-bold">{'A'}</span>
            </div>
            <span className="text-lg font-bold">{'AppName'}</span>
          </div>

          <p className="text-muted-foreground max-w-xs text-sm">{t('FOOTER.COMPANY_DESCRIPTION')}</p>

          {/* Contact Info */}
          <div className="space-y-2">
            {CONTACT_INFO.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <item.icon className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-xs">{item.name}</span>
              </div>
            ))}
          </div>

          {/* Social Links - Visible on all screen sizes */}
          <div className="pt-2">
            <h3 className="mb-3 text-sm font-medium">{t('FOOTER.FOLLOW_US')}</h3>
            <div className="flex space-x-3">
              {SOCIAL_LINKS.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8"
                >
                  <Link
                    href={social.href}
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Links - Grid layout that changes based on screen size */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {FOOTER_LINKS.map((section, index) => (
              <FooterSection
                key={index}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Bottom Section with Copyright and Legal Links */}
      <div className="flex flex-col space-y-4 pt-2 pb-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        {/* Copyright */}
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <Copyright className="h-4 w-4" />
          <p className="text-xs md:text-sm">{t('FOOTER.COPYRIGHT', { year: new Date().getFullYear() })}</p>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
          {BOTTOM_LINKS.map((link, index) => (
            <Button
              key={index}
              asChild
              variant="link"
              className="h-auto p-0 text-xs md:text-sm"
            >
              <Link
                href={link.href}
                className="flex items-center gap-1"
              >
                <link.icon className="h-3 w-3 md:h-4 md:w-4" />
                <span>{link.name}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <Separator className="my-4" />
    </div>
  )
}
