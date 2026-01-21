'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { type z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SignInSchema } from '@/modules/auth/validation/auth.validation'
import { PATH } from '@/resources/config/routes.config'
import { Link, useRouter } from '@/packages/next-intl/utils/navigation'
import { debugLog } from '@/lib/utils'

type SignInFormValues = z.infer<typeof SignInSchema>

export function SignInCredentialsForm() {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const [isPending, startTransition] = useTransition()
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: SignInFormValues) => {
    startTransition(async () => {
      const toastId = toast.loading('Signing in...')
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })
      debugLog('result', { result })
      if (result?.error) {
        toast.error(t('AUTH.SIGNIN_ERROR_MESSAGE'), {
          id: toastId,
        })
      } else if (result?.ok) {
        toast.success(t('AUTH.SIGNIN_SUCCESS_MESSAGE'), {
          id: toastId,
        })
        router.push(callbackUrl ?? PATH.PROTECTED.ORGANIZATION.ROOT)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('USER_DETAIL.EMAIL')}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t('AUTH.EMAIL_PLACEHOLDER') || 'm@example.com'}
                  {...field}
                  disabled={isPending}
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
              <div className="flex items-center justify-between">
                <FormLabel>{t('AUTH.PASSWORD_LABEL')}</FormLabel>
                <Link
                  href={{ pathname: PATH.PUBLIC.AUTH.FORGOT_PASSWORD }}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  {t('AUTH.FORGOT_PASSWORD_LINK')}
                </Link>
              </div>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-2 w-full"
          disabled={isPending}
        >
          {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : t('AUTH.SIGNIN')}
          {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>
    </Form>
  )
}
