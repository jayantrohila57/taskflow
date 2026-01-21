'use client'

import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useRouter } from '@/packages/next-intl/utils/navigation'

import GlobalSearchList from './global-search.list'

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  const t = useTranslations()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleSelect = (path: string) => {
    setIsOpen(false)
    router.push(path)
  }

  return (
    <div
      ref={searchRef}
      className="relative"
    >
      <button
        className="border-input bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/20 inline-flex h-9 w-80 rounded-lg border px-3 py-2 text-sm transition-shadow focus-visible:ring-[3px] focus-visible:outline-none"
        onClick={() => setIsOpen(true)}
      >
        <span className="flex grow items-center">
          <Search
            className="text-muted-foreground/80 -ms-1 me-3"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="text-muted-foreground/70 font-normal">{t('COMMON.SEARCH')}</span>
        </span>
        <kbd className="border-border bg-background text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
          {'⌘K'}
        </kbd>
      </button>
      {isOpen && (
        <GlobalSearchList
          onSelect={handleSelect}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  )
}
