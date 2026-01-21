'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations, type Messages } from 'next-intl'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { type z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { handleForgotPassword } from '@/modules/auth/api/auth.action' // Placeholder
import { ForgotPasswordSchema } from '@/modules/auth/validation/auth.validation'
import { PATH } from '@/resources/config/routes.config'
import { Loader, ArrowLeft } from 'lucide-react'
import { Link, useRouter } from '@/packages/next-intl/utils/navigation'
import { debugError } from '@/lib/utils'

type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>

type AuthMessages = keyof Messages['AUTH']
export function ForgotPassword() {
  const t = useTranslations()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: ForgotPasswordFormValues) => {
    startTransition(async () => {
      try {
        const result = await handleForgotPassword(values.email)
        if (result.success && result.message) {
          toast.success(t(`AUTH.${result.message as AuthMessages}`))
          form.reset() // Reset form on success
          // Redirect to Verify OTP page, passing email
          if (result.emailToSendToVerifyPage) {
            router.push(
              `${PATH.PUBLIC.AUTH.ROOT}/verify-otp?email=${encodeURIComponent(result.emailToSendToVerifyPage)}`,
            )
          } else {
            toast.error(t('AUTH.FORGOT_PASSWORD_ERROR_GENERIC'))
          }
        } else if (result.error && result.message) {
          toast.error(t(`AUTH.${result.message as AuthMessages}`))
        } else {
          toast.error(t('AUTH.FORGOT_PASSWORD_ERROR_GENERIC'))
        }
      } catch (e) {
        debugError('ERROR:FORGOT', { e })
        toast.error(t('AUTH.FORGOT_PASSWORD_ERROR_GENERIC'))
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('AUTH.EMAIL_LABEL')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  type="email"
                  placeholder={t('AUTH.EMAIL_PLACEHOLDER')}
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
          {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : t('AUTH.SEND_RESET_LINK_BUTTON')}
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
