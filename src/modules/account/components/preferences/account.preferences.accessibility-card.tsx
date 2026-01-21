'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const ACCESSIBILITY_OPTIONS = [
  { id: 'highContrast', label: 'High Contrast Mode' },
  { id: 'largeText', label: 'Large Text' },
  { id: 'screenReader', label: 'Screen Reader Support' },
]

const ACCESSIBILITY_TEXT = {
  TITLE: 'ACCESSIBILITY',
  SAVE_PREFERENCES: 'SAVE_PREFERENCES',
}

const AccessibilityCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{ACCESSIBILITY_TEXT.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          {ACCESSIBILITY_OPTIONS.map(({ id, label }) => (
            <div
              className="flex items-center space-x-2"
              key={id}
            >
              <Switch id={id} />
              <Label htmlFor={id}>{label}</Label>
            </div>
          ))}
          <Button type="submit">{ACCESSIBILITY_TEXT.SAVE_PREFERENCES}</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccessibilityCard
