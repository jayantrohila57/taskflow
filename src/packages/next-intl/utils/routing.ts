import { defineRouting } from 'next-intl/routing'

import { languageConfig } from './config'

export const routing = defineRouting({
  locales: languageConfig?.locales,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: languageConfig?.defaultLocale,

  // // Redirect to the default locale path if no locale is found
  localePrefix: 'always',

  // Map locales to specific paths if needed
  localeDetection: true,
})
