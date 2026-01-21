'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const PASSWORD_TEXT = {
  TITLE: 'CHANGE_PASSWORD',
  CURRENT_PASSWORD: 'CURRENT_PASSWORD',
  NEW_PASSWORD: 'NEW_PASSWORD',
  CONFIRM_PASSWORD: 'CONFIRM_PASSWORD',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
}

const PASSWORD_FIELDS = [
  {
    id: 'currentPassword',
    label: PASSWORD_TEXT.CURRENT_PASSWORD,
    type: 'password',
  },
  { id: 'newPassword', label: PASSWORD_TEXT.NEW_PASSWORD, type: 'password' },
  {
    id: 'confirmPassword',
    label: PASSWORD_TEXT.CONFIRM_PASSWORD,
    type: 'password',
  },
]

const ChangePasswordCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{PASSWORD_TEXT.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          {PASSWORD_FIELDS.map(({ id, label, type }) => (
            <div
              key={id}
              className="grid gap-2"
            >
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                type={type}
              />
            </div>
          ))}
          <Button type="submit">{PASSWORD_TEXT.UPDATE_PASSWORD}</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChangePasswordCard
