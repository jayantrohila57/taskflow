'use client'

import dynamic from 'next/dynamic'

import { Skeleton } from '@/components/ui/skeleton'

const LanguageSelector = dynamic(
  async () => await import('@/modules/language/language.selector').then((mod) => mod.LanguageSelector),
  {
    ssr: false,
    loading: () => <Skeleton className="h-9 w-14 rounded-md sm:w-20 md:w-40" />,
  },
)

const ModeToggle = dynamic(async () => await import('@/modules/theme/theme.selector').then((mod) => mod.ModeToggle), {
  ssr: false,
  loading: () => <Skeleton className="h-9 w-9 rounded-md" />,
})

export function HeaderActions() {
  return (
    <div className="flex flex-row gap-1 sm:gap-2 md:gap-4">
      <LanguageSelector />
      <ModeToggle />
    </div>
  )
}
