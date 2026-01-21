import type { MetadataRoute } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = 'en-US' as Locale

  const t = await getTranslations({
    locale,
  })

  return {
    name: t('TITLE'),
    short_name: 'TaskFlow',
    description: 'A modern task management application',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait',
    id: '/',
    scope: '/',
    categories: ['productivity', 'business'],
    launch_handler: {
      client_mode: ['navigate-existing', 'auto'],
    },
    icons: [
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192x192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/dashboard-light.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'TaskFlow Desktop Dashboard - Light Mode',
      },
      {
        src: '/screenshots/dashboard-dark.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'TaskFlow Desktop Dashboard - Dark Mode',
      },
      {
        src: '/screenshots/mobile-light.png',
        sizes: '750x1334',
        type: 'image/png',
        label: 'TaskFlow Mobile Interface - Light Mode',
      },
      {
        src: '/screenshots/mobile-dark.png',
        sizes: '750x1334',
        type: 'image/png',
        label: 'TaskFlow Mobile Interface - Dark Mode',
      },
    ],
  }
}
