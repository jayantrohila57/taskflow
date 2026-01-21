import type { routing } from '@/packages/next-intl/utils/routing'

import type messages from './src/packages/next-intl/languages/en-US.json'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}
