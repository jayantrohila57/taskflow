'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const TEXT = {
  TITLE: 'Personal Information',
  CHANGE_AVATAR: 'Change Avatar',
  FULL_NAME: { LABEL: 'Full Name', PLACEHOLDER: 'John Doe' },
  USERNAME: { LABEL: 'Username', PLACEHOLDER: 'johndoe' },
  EMAIL: { LABEL: 'Email', PLACEHOLDER: 'john@example.com' },
  BIO: { LABEL: 'Bio', PLACEHOLDER: 'Tell us about yourself' },
  SAVE: 'Save Changes',
}

export const PersonalInformationCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{TEXT.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User Avatar"
              />
              <AvatarFallback>{'JD'}</AvatarFallback>
            </Avatar>
            <Button variant="outline">{TEXT.CHANGE_AVATAR}</Button>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fullName">{TEXT.FULL_NAME.LABEL}</Label>
            <Input
              id="fullName"
              placeholder={TEXT.FULL_NAME.PLACEHOLDER}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">{TEXT.USERNAME.LABEL}</Label>
            <Input
              id="username"
              placeholder={TEXT.USERNAME.PLACEHOLDER}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{TEXT.EMAIL.LABEL}</Label>
            <Input
              id="email"
              type="email"
              placeholder={TEXT.EMAIL.PLACEHOLDER}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">{TEXT.BIO.LABEL}</Label>
            <Textarea
              id="bio"
              placeholder={TEXT.BIO.PLACEHOLDER}
            />
          </div>
          <Button type="submit">{TEXT.SAVE}</Button>
        </form>
      </CardContent>
    </Card>
  )
}
