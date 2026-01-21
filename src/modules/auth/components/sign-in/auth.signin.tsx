'use client'

import { Github, Loader } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { PATH } from '@/resources/config/routes.config'

const SigninWithGithub = () => {
  const [isLoading, startTransition] = useTransition()
  const t = useTranslations()
  const locale = useLocale()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const handleSignIn = () => {
    startTransition(async () => {
      const toastId = toast.loading('Signing in...')
      const result = await signIn('github', {
        redirect: true,
        redirectTo: `/${locale}/${callbackUrl ?? PATH.PROTECTED.ORGANIZATION.ROOT}`,
      })
      if (result?.error) {
        toast.error(t('AUTH.SIGNIN_ERROR_MESSAGE'), {
          id: toastId,
        })
      }
      if (result?.ok) {
        toast.success(t('AUTH.SIGNIN_SUCCESS_MESSAGE'), {
          id: toastId,
        })
      }
    })
  }

  return (
    <Button
      onClick={handleSignIn}
      className="w-auto"
      disabled={isLoading}
      variant={'secondary'}
    >
      {isLoading ? <Loader className="ml-4 animate-spin" /> : <Github className="ml-4" />}
      <span className="ml-2">{t('AUTH.SIGNIN_GITHUB')}</span>
    </Button>
  )
}

export default SigninWithGithub
