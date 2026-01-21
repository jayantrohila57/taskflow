'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const TEXT = {
  TITLE: 'CONTACT_INFORMATION',
  PHONE_LABEL: 'PHONE_NUMBER',
  PHONE_PLACEHOLDER: '+1 (555) 123-4567',
  ADDRESS_LABEL: 'ADDRESS',
  ADDRESS_PLACEHOLDER: '123 Main St, City, Country',
  TIMEZONE_LABEL: 'TIMEZONE',
  TIMEZONE_PLACEHOLDER: 'UTC-5',
  SAVE: 'SAVE_CHANGES',
}

const ContactInformationCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{TEXT.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="phone">{TEXT.PHONE_LABEL}</Label>
            <Input
              id="phone"
              type="tel"
              placeholder={TEXT.PHONE_PLACEHOLDER}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">{TEXT.ADDRESS_LABEL}</Label>
            <Input
              id="address"
              placeholder={TEXT.ADDRESS_PLACEHOLDER}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="timezone">{TEXT.TIMEZONE_LABEL}</Label>
            <Input
              id="timezone"
              placeholder={TEXT.TIMEZONE_PLACEHOLDER}
            />
          </div>
          <Button type="submit">{TEXT.SAVE}</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ContactInformationCard
