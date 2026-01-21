'use client'

import { memo, useCallback } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useRouter } from '@/packages/next-intl/utils/navigation'

const GoBackButton = memo(() => {
  const router = useRouter()
  const t = useTranslations()
  const handleGoBack = useCallback(() => router.back(), [router])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={'icon'}
            onClick={handleGoBack}
            variant={'outline'}
            aria-label={t('COMMON.BACK')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleGoBack()
              }
            }}
          >
            <ChevronLeft
              aria-hidden="true"
              focusable="false"
              role="presentation"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p id="go-back-tooltip">{t('COMMON.BACK')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
})

GoBackButton.displayName = 'GoBackButton'

export default GoBackButton
