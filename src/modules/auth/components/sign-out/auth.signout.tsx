'use client'

import { Loader, LogOut } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { signOut, type SignInResponse } from 'next-auth/react'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'
import { PATH } from '@/resources/config/routes.config'

const SignoutWithGithub = () => {
  const [isLoading, startTransition] = useTransition()
  const t = useTranslations()
  const locale = useLocale()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? PATH.ROOT

  const handleSignOut = () => {
    startTransition(async () => {
      const toastId = toast.loading('Signing out...')
      await signOut({
        redirect: true,
        redirectTo: `/${locale}/${callbackUrl ?? PATH.PUBLIC.AUTH.ROOT}`,
      })
      toast.success(t('AUTH.SIGNIN_SUCCESS_MESSAGE'), {
        id: toastId,
      })
    })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={'icon'}
            variant={'outline'}
            onClick={handleSignOut}
            className=""
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin" /> : <LogOut className="" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('AUTH.SIGN_OUT')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default SignoutWithGithub
