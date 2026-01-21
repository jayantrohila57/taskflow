import type { Row } from '@tanstack/react-table'
import { Clock, Globe, Languages, Moon, Sun } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { UserTypes } from '../../../validation/user.validation'

interface PreferencesCellProps {
  row: Row<UserTypes['UserWithRole']>
}

// Keep or remove literals based on where they are defined globally
const literals = {
  preferences: {
    timezone: 'Timezone',
    language: 'Language',
    theme: 'Theme',
    languages: {
      en: { label: 'English', icon: '🇺🇸' },
      es: { label: 'Spanish', icon: '🇪🇸' },
      fr: { label: 'French', icon: '🇫🇷' },
      de: { label: 'German', icon: '🇩🇪' },
      zh: { label: 'Chinese', icon: '🇨🇳' },
      ja: { label: 'Japanese', icon: '🇯🇵' },
      default: { label: 'Default', icon: '' }, // No specific flag for default
    },
    themes: {
      light: { label: 'Light', Icon: Sun },
      dark: { label: 'Dark', Icon: Moon },
      system: { label: 'System', Icon: Globe },
      default: { label: 'System', Icon: Globe }, // Default to system theme
    },
    notSet: 'Not Set',
  },
}

// Helper to get language details
const getLanguageDetails = (langCode?: string | null): { label: string; icon: string } | null => {
  if (!langCode || !(langCode in literals.preferences.languages)) {
    return null
  }
  return literals.preferences.languages[langCode as keyof typeof literals.preferences.languages]
}

// Helper to get theme details
const getThemeDetails = (themeCode?: string | null): { label: string; Icon: React.ElementType } => {
  const code = themeCode?.toLowerCase()
  if (code === 'light') return literals.preferences.themes.light
  if (code === 'dark') return literals.preferences.themes.dark
  return literals.preferences.themes.system // Default to system
}

export function PreferencesCell({ row }: PreferencesCellProps) {
  // Access properties directly from row.original, using original names
  const timezone = row.original.timezone ?? literals.preferences.notSet
  const languageDetails = getLanguageDetails(row.original.preferredLanguage)
  const themeDetails = getThemeDetails(row.original.preferredTheme)

  const ThemeIcon = themeDetails.Icon

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex items-center space-x-2">
        {/* Theme Preference */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="bg-muted flex h-6 w-6 items-center justify-center rounded-full border">
              <ThemeIcon className="text-muted-foreground h-3.5 w-3.5" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {literals.preferences.theme}
              {':'} {themeDetails.label}
            </p>
          </TooltipContent>
        </Tooltip>

        {/* Language Preference */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="bg-muted flex h-6 w-6 items-center justify-center rounded-full border">
              {languageDetails?.icon ? (
                <span className="text-sm">{languageDetails.icon}</span>
              ) : (
                <Languages className="text-muted-foreground h-3.5 w-3.5" />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {literals.preferences.language}
              {':'} {languageDetails?.label ?? literals.preferences.notSet}
            </p>
          </TooltipContent>
        </Tooltip>

        {/* Timezone Preference */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="bg-muted flex h-6 w-6 items-center justify-center rounded-full border">
              <Clock className="text-muted-foreground h-3.5 w-3.5" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {literals.preferences.timezone}
              {':'} {timezone}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
