import { ChevronRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui/button'
import { Link } from '@/packages/next-intl/utils/navigation'
import { PATH } from '@/resources/config/routes.config'
import type { Locale } from 'next-intl'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

const HomePage = async ({ params }: PageProps) => {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-10 py-10">
      <h2 className="mx-auto max-w-screen-xl text-center text-3xl font-bold text-balance sm:text-5xl md:text-8xl">
        {t('HOME.HEADLINE')}
      </h2>
      <p className="text-muted-foreground mx-auto max-w-screen-md text-center md:text-2xl">{t('HOME.DESCRIPTION')}</p>
      <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
        <Button
          size="lg"
          asChild
          variant="outline"
        >
          <Link href={PATH.PUBLIC.AUTH.ROOT}>
            {t('HOME.GET_STARTED')} <ChevronRight className="ml-2 size-4" />
          </Link>
        </Button>
        <div className="text-muted-foreground text-xs">{t('HOME.STATS')}</div>
      </div>
    </div>
  )
}

export { HomePage }
