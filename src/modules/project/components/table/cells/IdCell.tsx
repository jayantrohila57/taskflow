'use client'

import { Copy } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface IdCellProps {
  id: string
}

export function IdCell({ id }: IdCellProps) {
  const t = useTranslations()
  const copyToClipboard = () => {
    void navigator.clipboard.writeText(id)
    toast.success(t('COMMON.ID_COPIED_TO_CLIPBOARD'))
  }

  return (
    <div className="flex items-center gap-2">
      <span className={cn('text-muted-foreground font-mono text-xs')}>{id}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5"
        onClick={copyToClipboard}
      >
        <Copy className="h-3 w-3" />
        <span className="sr-only">{t('COMMON.COPY_ID')}</span>
      </Button>
    </div>
  )
}
