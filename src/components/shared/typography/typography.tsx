import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import type React from 'react'
import type { ReactNode, FC } from 'react'

const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      h1: 'text-4xl font-bold',
      h2: 'text-3xl font-semibold',
      h3: 'text-2xl font-medium',
      h4: 'text-xl font-medium',
      p: 'text-base',
      muted: 'text-sm text-muted-foreground',
      small: 'text-xs',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    variant: 'p',
    align: 'left',
  },
})

interface TypographyProps extends VariantProps<typeof typographyVariants> {
  className?: string
  children: ReactNode
  as?: keyof React.JSX.IntrinsicElements
}

const Typography: FC<TypographyProps> = ({ className, variant, align, as: Tag = 'p', ...props }) => {
  return (
    <Tag
      className={cn(typographyVariants({ variant, align }), className)}
      {...props}
    />
  )
}

export default Typography
