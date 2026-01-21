import React from 'react'

import { cn } from '@/lib/utils'

const BgGridPattern = ({ showGrid = true }: { showGrid?: boolean }) => {
  if (!showGrid) return null

  return (
    <div
      className={cn(
        'fixed z-0 [mask-image:radial-gradient(900px_circle_at_center,white,transparent)] blur-xs transition-all duration-300',
        'inset-x-0 inset-y-[0%] h-[100vh] skew-y-12',
      )}
    />
  )
}

export default BgGridPattern
