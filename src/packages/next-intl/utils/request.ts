import { hasLocale, type Messages } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'

type MessagesWithDefault = Messages & { default: Messages }

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  return {
    locale,
    messages: ((await import(`../languages/${locale}.json`)) as MessagesWithDefault).default,
  }
})
