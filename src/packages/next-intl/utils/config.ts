import type { Locale } from 'next-intl'

export type LanguageSelector = {
  locale: Locale
  name: string
  flag: string
}

const locales = ['en-US', 'hi-IN', 'ja-JP', 'sk-IN', 'ur-PK'] as const

const defaultLocale = locales[0]

const languageContant: Record<(typeof locales)[number], string> = {
  'en-US': '/en-US',
  'hi-IN': '/hi-IN',
  'ja-JP': '/ja-JP',
  'sk-IN': '/sk-IN',
  'ur-PK': '/ur-PK',
}

const languages: LanguageSelector[] = [
  { locale: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { locale: 'hi-IN', name: 'हिन्दी (भारत)', flag: '🇮🇳' },
  { locale: 'sk-IN', name: 'संस्कृत (भारत)', flag: '🇮🇳' },
  { locale: 'ja-JP', name: '日本語 (日本)', flag: '🇯🇵' },
  { locale: 'ur-PK', name: 'اردو (پاکستان)', flag: '🇵🇰' },
]

export const languageConfig = {
  locales,
  defaultLocale,
  languages,
  languageContant,
}
