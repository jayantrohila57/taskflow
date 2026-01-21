'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const LANGUAGE_AND_REGION_TEXT = {
  TITLE: 'LANGUAGE_AND_REGION',
  LANGUAGE_LABEL: 'LANGUAGE',
  TIMEZONE_LABEL: 'TIMEZONE',
  SAVE_PREFERENCES: 'SAVE_PREFERENCES',
}

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
]

const TIMEZONES = [
  { value: 'UTC', label: 'UTC' },
  { value: 'EST', label: 'Eastern Time' },
  { value: 'PST', label: 'Pacific Time' },
]

const LanguageAndRegionCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{LANGUAGE_AND_REGION_TEXT.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="language">{LANGUAGE_AND_REGION_TEXT.LANGUAGE_LABEL}</Label>
            <select
              id="language"
              className="w-full rounded border p-2"
            >
              {LANGUAGES.map(({ value, label }) => (
                <option
                  key={value}
                  value={value}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="timezone">{LANGUAGE_AND_REGION_TEXT.TIMEZONE_LABEL}</Label>
            <select
              id="timezone"
              className="w-full rounded border p-2"
            >
              {TIMEZONES.map(({ value, label }) => (
                <option
                  key={value}
                  value={value}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit">{LANGUAGE_AND_REGION_TEXT.SAVE_PREFERENCES}</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default LanguageAndRegionCard
