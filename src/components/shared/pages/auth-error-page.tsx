'use client'

import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Link } from '@/packages/next-intl/utils/navigation'
import { PATH } from '@/resources/config/routes.config'

enum Error {
  Configuration = 'Configuration',
}

const errorMap = {
  [Error.Configuration]: 'There was a problem when trying to authenticate. Please contact us if this error persists.',
}

export default function AuthErrorPage() {
  const t = useTranslations('ERROR_PAGE')
  const search = useSearchParams()
  const error = search.get('error') as Error
  const errorMessage = errorMap[error] || 'Please contact us if this error persists.'

  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-10 backdrop-blur-sm">
      <div className="relative z-10 flex flex-col gap-10 backdrop-blur-sm">
        <h2 className="mx-auto max-w-screen-xl text-center text-3xl font-medium text-balance sm:text-5xl md:text-7xl">
          {t('TITLE')}
        </h2>
        <p className="text-muted-foreground mx-auto max-w-screen-md text-center md:text-lg">
          {errorMessage}
          {error && (
            <span>
              {' Unique error code: '}
              <code className="rounded-sm bg-slate-500/50 p-1 text-xs">{error}</code>
            </span>
          )}
        </p>
        <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
          <Button
            size="lg"
            asChild
          >
            <Link href={PATH.ROOT}>
              {t('GO_HOME')} <ChevronRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
