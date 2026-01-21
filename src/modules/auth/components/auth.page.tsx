import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@/packages/next-intl/utils/navigation'
import { debugLog } from '@/lib/utils'
import { ChevronRight, HandHelpingIcon, KeyIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { Locale } from 'next-intl'

const authLinks = [
  {
    title: 'Sign In',
    description: 'Log in to your account to access personalized services.',
    href: '/auth/sign-in',
    footer: 'Sign In',
    icon: <LogInIcon className="mt-1 h-4 w-4" />,
  },
  {
    title: 'Sign Up',
    description: 'Create a new account and get started with our services.',
    href: '/auth/sign-up',
    footer: 'Sign Up',
    icon: <LogOutIcon className="mt-1 h-4 w-4" />,
  },
  {
    title: 'Forgot Password',
    description: 'Reset your password and regain access to your account.',
    href: '/auth/forgot-password',
    footer: 'Forgot',
    icon: <KeyIcon className="mt-1 h-4 w-4" />,
  },
  {
    title: 'Passkey',
    description: 'Sign in securely using a passkey (password less authentication).',
    href: '/auth/passkey',
    footer: 'Use Passkey',
    icon: <KeyIcon className="mt-1 h-4 w-4" />,
  },
  {
    title: 'Need Help',
    description:
      'Get support or answers to any questions you may have. Our support team is here to assist you with your account or our services.',
    href: '/support/account',
    footer: 'Get Support',
    icon: <HandHelpingIcon className="mt-1 h-4 w-4" />,
  },
]

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}
const AuthPageComponent = async ({ params }: PageProps) => {
  const { locale } = await params
  const t = await getTranslations({ locale })
  debugLog('t', t('ACCOUNTS.COPY_ID'))

  return (
    <>
      <div className="grid h-auto w-full grid-cols-2 gap-2 md:gap-4">
        {authLinks.map((link, index) => (
          <Card
            key={index}
            className="col-span-1 flex h-auto w-full flex-col justify-between border-none last:col-span-2"
          >
            <CardHeader>
              <CardTitle className="flex w-full flex-row items-start justify-start gap-2 px-0 text-base">
                {link.icon} {link?.title}
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">{link?.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex w-full items-end justify-end md:px-4">
              <Button
                asChild
                aria-label={link?.footer}
                className="group gap-2 transition-all duration-300 active:scale-[.98]"
                size={'sm'}
                variant={'secondary'}
              >
                <Link href={link?.href}>
                  <>
                    {link?.footer}
                    <ChevronRight className="h-8 w-8 transition-all duration-300 group-hover:translate-x-1" />
                  </>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

export default AuthPageComponent
