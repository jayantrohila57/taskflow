'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn, debugLog } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { X } from 'lucide-react'

export const TextSelectionToolbar = () => {
  const [selectedText, setSelectedText] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection()
      const text = selection?.toString().trim() || ''

      if (text.length > 0) {
        setSelectedText(text)
        setVisible(true)
      } else {
        setVisible(false)
        setSelectedText('')
      }
    }

    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  const handleAction = (action: string) => {
    debugLog(`${action}:`, selectedText)
  }

  return (
    <Card
      className={cn(
        'bg-muted border-accent fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit max-w-xl p-0 py-2 shadow-md backdrop-blur-xs transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0',
      )}
    >
      <CardContent className="mx-auto flex flex-row gap-4 px-2">
        <Button
          variant="ghost"
          onClick={() => handleAction('Highlight')}
        >
          {'Highlight'}
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleAction('Share')}
        >
          {'Share'}
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleAction('Private Note')}
        >
          {'Private Note'}
        </Button>
        <Button
          variant="ghost"
          size={'icon'}
          onClick={() => setVisible(false)}
        >
          <X />
        </Button>
      </CardContent>
    </Card>
  )
}
