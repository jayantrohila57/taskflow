'use client'

import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from '@/packages/next-intl/utils/navigation'
import { api } from '@/packages/trpc/react'
import { PATH } from '@/resources/config/routes.config'
import { debugError, debugLog } from '@/lib/utils'

interface OrganizationForm {
  name: string
  description?: string
}

export default function CreateOrganization() {
  const t = useTranslations()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationForm>({
    defaultValues: {
      name: '',
      description: '',
    },
  })
  const mutation = api.organization.create.useMutation({
    onSuccess: (data) => {
      debugLog('organization.create.tsx', 'Organization created successfully', data)
      // Redirect or show success message
    },
    onError: (error) => {
      debugError('organization.create.tsx', 'Error creating organization', error)
      // Show error message to user
    },
  })

  const onSubmit = async (data: OrganizationForm) => {
    try {
      debugLog('organization.create.tsx', 'Submitting organization creation form', data)
      await mutation.mutateAsync({
        title: data.name,
        slug: data.name.toLowerCase().replace(/\s+/g, '-'), // Generate slug from name
        description: data.description ?? null,
      })
    } catch (error) {
      debugError('organization.create.tsx', 'Error submitting form', error)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>{t('ORGANIZATION.CREATE_AN_ORGANIZATION')}</CardTitle>
        <CardDescription>{t('ORGANIZATION.SET_UP_A_NEW_ORGANIZATION_FOR_YOUR_TEAM')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-y-4">
            <Label
              htmlFor="name"
              className="text-lg"
            >
              {t('ORGANIZATION.ORGANIZATION_NAME')}
            </Label>
            <Input
              id="name"
              placeholder={t('ORGANIZATION.ENTER_ORGANIZATION_NAME')}
              {...register('name', { required: true })}
            />
            {errors.name && <span className="text-red-500">{'This field is required'}</span>}
          </div>
          <div className="space-y-4 pb-4">
            <Label
              htmlFor="description"
              className="text-lg"
            >
              {t('ORGANIZATION.ORGANIZATION_URL')}
            </Label>
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2 text-lg">{t('ORGANIZATION.TASKFLOW_COM')}</span>
              <Input
                id="description"
                placeholder={t('ORGANIZATION.YOUR_ORG')}
                {...register('description')}
              />
            </div>
          </div>
          <Button type="submit">{t('ORGANIZATION.CREATE_ORGANIZATION')}</Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground w-full text-center text-lg">
          {t('ORGANIZATION.INVITE_TEAM_MEMBERS_AFTER_CREATING')}
        </p>
      </CardFooter>
    </Card>
  )
}
