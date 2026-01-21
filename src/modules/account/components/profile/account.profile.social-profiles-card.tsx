'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const SOCIAL_TEXT = {
  TITLE: 'SOCIAL_PROFILES',
  TWITTER: 'TWITTER',
  LINKEDIN: 'LINKEDIN',
  GITHUB: 'GITHUB',
  SAVE_CHANGES: 'SAVE_CHANGES',
}

const SOCIAL_INPUTS = [
  { id: 'twitter', label: SOCIAL_TEXT.TWITTER, placeholder: '@username' },
  {
    id: 'linkedin',
    label: SOCIAL_TEXT.LINKEDIN,
    placeholder: 'linkedin.com/in/username',
  },
  {
    id: 'github',
    label: SOCIAL_TEXT.GITHUB,
    placeholder: 'github.com/username',
  },
]

const SocialProfilesCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{SOCIAL_TEXT.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          {SOCIAL_INPUTS.map(({ id, label, placeholder }) => (
            <div
              key={id}
              className="grid gap-2"
            >
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                placeholder={placeholder}
              />
            </div>
          ))}
          <Button type="submit">{SOCIAL_TEXT.SAVE_CHANGES}</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default SocialProfilesCard
