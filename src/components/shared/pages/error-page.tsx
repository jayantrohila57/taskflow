'use client'

import React from 'react'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Link } from '@/packages/next-intl/utils/navigation'
import { PATH } from '@/resources/config/routes.config'

export default function ErrorPageComponent({ error, reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('ERROR_PAGE')

  return (
    <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center gap-10 backdrop-blur-sm">
      <h2 className="mx-auto max-w-screen-xl text-center text-3xl font-medium text-balance sm:text-5xl md:text-7xl">
        {t('TITLE')}
      </h2>
      <code className="bg-accent text-accent-foreground mx-auto max-w-screen-md rounded-2xl border p-4 text-center md:text-lg">
        {error?.message || t('DESCRIPTION')}
      </code>
      <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
        <Button
          size="lg"
          onClick={reset}
        >
          {t('TRY_AGAIN')}
        </Button>
        <Button
          size="lg"
          asChild
          variant="outline"
        >
          <Link href={PATH.ROOT}>
            {t('GO_HOME')} <ChevronRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
