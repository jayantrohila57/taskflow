'use client'

import { useState, useTransition } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { useLocale, type Locale } from 'next-intl'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { languageConfig, type LanguageSelector } from '@/packages/next-intl/utils/config'
import { usePathname, useRouter } from '@/packages/next-intl/utils/navigation'
import { cn } from '@/lib/utils'

export function LanguageSelector() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('LANGUAGE')

  const currentLanguage = languageConfig?.languages?.find((l) => l.locale === locale) || languageConfig?.languages[0]

  const handleLocaleChange = (newLocale: Locale) => {
    startTransition(() => {
      router.push(pathname, { locale: newLocale })
      setIsOpen(false)
    })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-14 gap-1 px-2 sm:w-20 md:w-40 md:gap-2 md:px-4"
                disabled={isPending}
              >
                <span className="mb-0.5 text-lg md:mr-1">{currentLanguage!.flag}</span>
                <span className="hidden md:inline-block">{currentLanguage!.name}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[200px]"
          >
            {languageConfig?.languages?.map((language) => (
              <DropdownMenuItem
                key={language?.locale}
                className={cn('flex cursor-pointer items-center gap-2', locale === language?.locale && 'font-medium')}
                onClick={() => handleLocaleChange(language?.locale)}
                disabled={isPending}
              >
                <span className="text-lg">{language?.flag}</span>
                <span className="flex-1">{language?.name}</span>
                {locale === language?.locale && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent>
          <p>{t('TOOLTIP')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
