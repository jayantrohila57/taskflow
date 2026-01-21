import { getTranslations } from 'next-intl/server'
import { Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import SigninWithGithub from './auth.signin'
import { SignInCredentialsForm } from './auth.signin.credentials'
import { PATH } from '@/resources/config/routes.config'
import { Link } from '@/packages/next-intl/utils/navigation'
import type { Locale } from 'next-intl'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

const AuthSignInPage = async ({ params }: PageProps) => {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <div className="flex flex-col gap-6">
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
      <SignInCredentialsForm />
      <div className="text-center text-sm">
        {t('AUTH.NO_ACCOUNT_PROMPT')}{' '}
        <Link
          href={{ pathname: PATH.PUBLIC.AUTH.SIGN_UP }}
          className="text-primary font-medium hover:underline"
        >
          {t('AUTH.CREATE_ACCOUNT_LINK')}
        </Link>
      </div>
      <div className="text-muted-foreground hover:[&_a]:text-primary flex w-full flex-col items-center justify-center text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        <p className="px-2">{t('AUTH.AGREEMENT_PREFIX')}</p>
        <p>
          <Link
            href={{ pathname: PATH.PUBLIC.LEGAL.TERMS_CONDITIONS }}
            className="hover:text-primary"
          >
            {t('AUTH.TERMS_OF_SERVICE')}
          </Link>{' '}
          {t('COMMON.AND')}{' '}
          <Link
            href={{ pathname: PATH.PUBLIC.LEGAL.PRIVACY_POLICY }}
            className="hover:text-primary"
          >
            {t('AUTH.PRIVACY_POLICY')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export { AuthSignInPage }
