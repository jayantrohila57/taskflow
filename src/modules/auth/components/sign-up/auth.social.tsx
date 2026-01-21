'use client'

import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import SigninWithGithub from '../sign-in/auth.signin'
import { useTranslations } from 'next-intl'

const SocialAuth = () => {
  const t = useTranslations()
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <SigninWithGithub />

        <Button
          variant="outline"
          className="w-full"
          disabled
        >
          <Mail className="mr-2 h-4 w-4" />
          {t('AUTH.SIGNIN_GOOGLE')}
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background text-muted-foreground px-2 text-sm">{t('AUTH.OR_CONTINUE_WITH')}</span>
        </div>
      </div>
    </>
  )
}

export default SocialAuth
