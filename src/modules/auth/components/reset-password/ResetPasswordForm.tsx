'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations, type Messages } from 'next-intl'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { type z } from 'zod'

import InputPasswordField from '@/components/shared/form/fields/controlled/input.password'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { handleResetPassword } from '@/modules/auth/api/auth.action' // To be created
import { ResetPasswordSchema } from '@/modules/auth/validation/auth.validation'
import { PATH } from '@/resources/config/routes.config'
import { Loader, ArrowLeft } from 'lucide-react'
import { Link, useRouter } from '@/packages/next-intl/utils/navigation'
import { debugLog } from '@/lib/utils'

type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>
type AuthMessages = keyof Messages['AUTH']
interface ResetPasswordFormProps {
  token: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const t = useTranslations()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      token: token, // Pre-fill token from props
      password: '',
      passwordConfirmation: '',
    },
  })

  const onSubmit = (values: ResetPasswordFormValues) => {
    startTransition(async () => {
      try {
        // Ensure token is included in the values passed to the action
        const result = await handleResetPassword({
          token: values.token,
          password: values.password,
        })
        if (result.success) {
          toast.success(t(`AUTH.${result.messageKey as AuthMessages}`))
          router.push(PATH.PUBLIC.AUTH.SIGN_IN)
        } else {
          toast.error(t(`AUTH.${result.messageKey as AuthMessages}`))
          if (result.redirectToForgotPassword) {
            router.push(PATH.PUBLIC.AUTH.FORGOT_PASSWORD)
          }
        }
      } catch (error: unknown) {
        debugLog('ERROR:RESET-PASSWORD', { error })
        toast.error(t('AUTH.PASSWORD_RESET_ERROR_GENERIC'))
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <input
                  {...field}
                  type="hidden"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('AUTH.NEW_PASSWORD_LABEL')}</FormLabel>
              <FormControl>
                <InputPasswordField
                  {...field}
                  disabled={isPending}
                  placeholder={t('AUTH.PASSWORD_PLACEHOLDER') || '••••••••'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('AUTH.CONFIRM_NEW_PASSWORD_LABEL')}</FormLabel>
              <FormControl>
                <InputPasswordField
                  {...field}
                  disabled={isPending}
                  placeholder={t('AUTH.PASSWORD_PLACEHOLDER') || '••••••••'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="w-full"
        >
          {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : t('AUTH.RESET_PASSWORD_BUTTON')}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        <Link
          href={{ pathname: PATH.PUBLIC.AUTH.SIGN_IN }}
          className="text-muted-foreground hover:text-primary flex items-center justify-center"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          {t('AUTH.BACK_TO_SIGN_IN_LINK')}
        </Link>
      </div>
    </Form>
  )
}
