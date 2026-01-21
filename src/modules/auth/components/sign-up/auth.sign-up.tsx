'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { type z } from 'zod'

import InputPasswordField from '@/components/shared/form/fields/controlled/input.password'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ActionSignUp } from '@/modules/auth/api/auth.action'
import { SignUpSchema } from '@/modules/auth/validation/auth.validation'
import { PATH } from '@/resources/config/routes.config'
import { Loader } from 'lucide-react'
import { Link, useRouter } from '@/packages/next-intl/utils/navigation'
import { debugLog } from '@/lib/utils'

type SignUpFormValues = z.infer<typeof SignUpSchema>

export function SignUp() {
  const t = useTranslations()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  })

  const onSubmit = (values: SignUpFormValues) => {
    startTransition(async () => {
      try {
        const result = await ActionSignUp(values)
        if (result.success && result.message) {
          toast.success(result.message)
          router.push(PATH.PUBLIC.AUTH.SIGN_IN)
          form.reset()
        } else if (result.error && result.message) {
          toast.error(result.message)
        } else {
          toast.error(t('AUTH.SIGNUP_ERROR_GENERIC'))
        }
      } catch (e) {
        debugLog('ERROR:SIGNUP', { e })
        toast.error(t('AUTH.SIGNUP_ERROR_GENERIC'))
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=""
      >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('AUTH.NAME_LABEL')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    type="text"
                    placeholder={t('AUTH.NAME_PLACEHOLDER')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('USER_DETAIL.EMAIL')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    type="email"
                    placeholder={t('AUTH.EMAIL_PLACEHOLDER_SIGNUP')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('AUTH.PASSWORD_LABEL') || 'Password'}</FormLabel>
                <FormControl>
                  <InputPasswordField
                    {...field}
                    disabled={isPending}
                    placeholder={t('AUTH.PASSWORD_PLACEHOLDER')}
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
                <FormLabel>{t('AUTH.CONFIRM_PASSWORD_LABEL')}</FormLabel>
                <FormControl>
                  <InputPasswordField
                    {...field}
                    disabled={isPending}
                    placeholder={t('AUTH.PASSWORD_PLACEHOLDER')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
                <div className="space-y-1 leading-none">
                  <div className="text-muted-foreground text-sm">
                    {t('AUTH.AGREE_TO_PREFIX')}{' '}
                    <Link
                      href={{ pathname: PATH.PUBLIC.LEGAL.TERMS_CONDITIONS }}
                      className="text-primary hover:underline"
                    >
                      {t('AUTH.TERMS_OF_SERVICE')}
                    </Link>{' '}
                    {t('COMMON.AND')}{' '}
                    <Link
                      href={{ pathname: PATH.PUBLIC.LEGAL.PRIVACY_POLICY }}
                      className="text-primary hover:underline"
                    >
                      {t('AUTH.PRIVACY_POLICY')}
                    </Link>
                    {'.'}
                  </div>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 pt-2">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : t('AUTH.SIGNUP_BUTTON')}
          </Button>
          <div className="flex w-full flex-row items-center justify-center gap-6">
            <Separator className="w-2/5 opacity-40" />
            {t('AUTH.OR_SEPARATOR')}
            <Separator className="w-2/5 opacity-40" />
          </div>
        </div>
      </form>

      <div className="flex w-full flex-row items-center justify-center gap-1">
        <p className="text-muted-foreground text-sm">{t('AUTH.ALREADY_HAVE_ACCOUNT')}</p>
        <Button
          size={'sm'}
          className="text-primary m-0 h-5 p-0 font-medium"
          variant={'link'}
          asChild
        >
          <Link href={{ pathname: PATH.PUBLIC.AUTH.SIGN_IN }}> {t('AUTH.LOGIN_LINK')}</Link>
        </Button>
      </div>
    </Form>
  )
}
