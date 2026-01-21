import { useTranslations } from 'next-intl'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Link } from '@/packages/next-intl/utils/navigation'
import { PATH } from '@/resources/config/routes.config'

export default function HeaderLogo() {
  const t = useTranslations('HEADER')

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <h2 className="cursor-pointer text-xl font-medium transition-all duration-300 hover:scale-[.99] active:scale-[.97]">
            <Link
              href={PATH.ROOT}
              aria-label={t('LOGO')}
              title={t('LOGO')}
            >
              {t('LOGO')}
            </Link>
          </h2>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('LOGO')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
