'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations, type Messages } from 'next-intl'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { type z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription, // For OTP input instructions
} from '@/components/ui/form'
import { Input } from '@/components/ui/input' // Standard input for OTP
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp' // ShadCN OTP Input
import { handleVerifyPasswordResetOtp } from '@/modules/auth/api/auth.action' // To be created
import { VerifyOtpSchema } from '@/modules/auth/validation/auth.validation'
import { PATH } from '@/resources/config/routes.config'
import { Loader } from 'lucide-react'
import { useRouter } from '@/packages/next-intl/utils/navigation'

type VerifyOtpFormValues = z.infer<typeof VerifyOtpSchema>
type AuthMessage = keyof Messages['AUTH']
interface VerifyOtpFormProps {
  email: string
}

export function VerifyOtpForm({ email }: VerifyOtpFormProps) {
  const t = useTranslations()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      email: email, // Pre-fill email from props
      otp: '',
    },
  })

  const onSubmit = (values: VerifyOtpFormValues) => {
    startTransition(async () => {
      try {
        const result = await handleVerifyPasswordResetOtp({ email: values.email, otp: values.otp })
        if (result.success && result.grantToken) {
          toast.success(t(`AUTH.${result.messageKey as AuthMessage}`))
          // Redirect to Reset Password page with the grant token
          router.push(`${PATH.PUBLIC.AUTH.RESET_PASSWORD}?token=${result.grantToken}`)
        } else if (result.error && result.messageKey) {
          toast.error(t(`AUTH.${result.messageKey as AuthMessage}`))
        } else {
          toast.error(t('AUTH.OTP_VERIFY_ERROR_GENERIC'))
        }
      } catch (e) {
        toast.error(t('AUTH.OTP_VERIFY_ERROR_GENERIC'))
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Hidden email field if needed, or rely on closure value passed to action */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input
                  {...field}
                  type="hidden"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>{t('AUTH.OTP_LABEL')}</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                >
                  <InputOTPGroup>
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>{t('AUTH.OTP_ENTER_DESCRIPTION')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="w-full"
        >
          {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : t('AUTH.VERIFY_OTP_BUTTON')}
        </Button>
      </form>
    </Form>
  )
}
