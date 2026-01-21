import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function JoinOrganization() {
  const t = await getTranslations()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('ORGANIZATION.JOIN_AN_ORGANIZATION')}</CardTitle>
        <CardDescription>{t('ORGANIZATION.ENTER_INVITE_CODE_DESCRIPTION')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-4">
            <Label
              htmlFor="invite-code"
              className="text-lg"
            >
              {t('ORGANIZATION.ORGANIZATION_INVITE_CODE')}
            </Label>
            <Input
              id="invite-code"
              placeholder={t('ORGANIZATION.ENTER_INVITE_CODE_PLACEHOLDER')}
            />
          </div>
          <Button type="submit">{t('ORGANIZATION.JOIN_ORGANIZATION')}</Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground w-full text-center text-lg">{t('ORGANIZATION.CONTACT_ADMIN_MESSAGE')}</p>
      </CardFooter>
    </Card>
  )
}
