'use client'

import React from 'react'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Link } from '@/packages/next-intl/utils/navigation'
import { PATH } from '@/resources/config/routes.config'

export default function NotFoundComponent() {
  const t = useTranslations('NOT_FOUND')

  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-10 backdrop-blur-sm">
      <h2 className="mx-auto max-w-screen-xl text-center text-3xl font-medium text-balance sm:text-5xl md:text-7xl">
        {t('TITLE')}
      </h2>
      <p className="text-muted-foreground mx-auto max-w-screen-md text-center md:text-lg">{t('DESCRIPTION')}</p>
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
  )
}
