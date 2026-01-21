import type { MetadataRoute } from 'next'
import type { Locale } from 'next-intl'

import { getPathname } from '@/packages/next-intl/utils/navigation'
import { routing } from '@/packages/next-intl/utils/routing'

const host = 'https://taskflow.app'

// Define all routes
const routes = [
  '/',
  '/dashboard',
  '/tasks',
  '/projects',
  '/calendar',
  '/settings',
  '/profile',
  '/notifications',
  '/help',
  '/about',
  '/privacy',
  '/terms',
  '/contact',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) => getEntries(route))
}

type Href = Parameters<typeof getPathname>[0]['href']

function getEntries(href: Href) {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(href),
    priority: getPriority(href),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((cur) => [cur, getUrl(href, cur)])),
    },
  }))
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href })
  return host + pathname
}

function getChangeFrequency(href: Href): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  switch (href) {
    case '/':
    case '/dashboard':
    case '/tasks':
    case '/calendar':
      return 'daily'
    case '/projects':
      return 'weekly'
    case '/settings':
    case '/profile':
    case '/notifications':
      return 'monthly'
    case '/help':
    case '/about':
    case '/privacy':
    case '/terms':
    case '/contact':
      return 'yearly'
    default:
      return 'monthly'
  }
}

function getPriority(href: Href): number {
  switch (href) {
    case '/':
      return 1
    case '/dashboard':
      return 0.9
    case '/tasks':
      return 0.8
    case '/projects':
      return 0.7
    case '/calendar':
      return 0.7
    case '/settings':
      return 0.5
    default:
      return 0.6
  }
}
