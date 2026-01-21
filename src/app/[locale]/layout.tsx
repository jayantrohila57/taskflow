import '@/resources/styles/globals.css'
import { getLangDir } from 'rtl-detect'

import { hasLocale, NextIntlClientProvider, type Locale } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { Geist as Font } from 'next/font/google'
import { notFound } from 'next/navigation'

import { ThemeProvider } from '@/modules/theme/theme.provider'
import { languageConfig } from '@/packages/next-intl/utils/config'
import { TRPCReactProvider } from '@/packages/trpc/react'
import { routing } from '../../packages/next-intl/utils/routing'
import { WebVitals } from '@/components/scripts/web-vitals'
import { TextSelectionToolbar } from '@/components/shared/selection/selection'
import DirectionProvider from '@/components/shared/direction/direction-provider'
import { Toaster } from '@/components/ui/sonner'

interface LayoutProps {
  params: Promise<{
    locale: Locale
  }>
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export async function generateMetadata({ params }: LayoutProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    metadataBase: new URL('https://taskflow.app'),
    title: {
      default: t('TITLE'),
      template: `%s | ${t('TITLE')}`,
    },
    description: t('DESCRIPTION'),
    keywords: ['task management', 'productivity', 'project management', 'todo', 'tasks', 'workflow'],
    authors: [{ name: 'TaskFlow Team' }],
    creator: 'TaskFlow',
    publisher: 'TaskFlow',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: [
      { rel: 'icon', url: '/favicon.ico' },
      { rel: 'apple-touch-icon', url: '/icons/icon-192x192.png' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/icons/icon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/icons/icon-16x16.png',
      },
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: languageConfig?.languageContant,
    },
    manifest: '/manifest.json',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: t('TITLE'),
    },
    applicationName: 'TaskFlow',
    openGraph: {
      type: 'website',
      locale: locale,
      url: `https://taskflow.app/${locale}`,
      title: t('TITLE'),
      description: t('DESCRIPTION'),
      siteName: 'TaskFlow',
      images: [
        {
          url: '/screenshots/dashboard-light.png',
          width: 1280,
          height: 720,
          alt: 'TaskFlow Dashboard - Light Mode',
        },
        {
          url: '/screenshots/dashboard-dark.png',
          width: 1280,
          height: 720,
          alt: 'TaskFlow Dashboard - Dark Mode',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('TITLE'),
      description: t('DESCRIPTION'),
      images: ['/screenshots/dashboard-light.png'],
      creator: '@taskflow',
      site: '@taskflow',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'google-site-verification-code',
      yandex: 'yandex-verification-code',
      yahoo: 'yahoo-verification-code',
    },
  }
}

const font = Font({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: Locale
  }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  const direction = getLangDir(locale)

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${font.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <TRPCReactProvider>
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
          >
            <DirectionProvider direction={direction}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <WebVitals />
                <Toaster />
                <TextSelectionToolbar />
              </ThemeProvider>
            </DirectionProvider>
          </NextIntlClientProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
