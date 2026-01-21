'use client'
import { Direction } from 'radix-ui'

import React from 'react'

type DirectionType = 'rtl' | 'ltr'

export default function DirectionProvider({
  direction,
  ...props
}: {
  children: React.ReactNode
  direction: DirectionType
}) {
  return (
    <Direction.Provider
      dir={direction}
      {...props}
    />
  )
}
