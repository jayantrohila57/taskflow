import { cn } from '@/lib/utils'
import React, { type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { HydrateClient } from '@/packages/trpc/server'

interface ShellTypes {
  children: React.ReactNode
}
interface ShellComponent extends ShellTypes {
  Main?: typeof Main
  Aside?: typeof Aside
  Footer?: typeof Footer
  Header?: typeof Header
  Section?: typeof Section
}

export const Shell = ({ children }: ShellComponent) => {
  return <HydrateClient>{children}</HydrateClient>
}

const HeaderVariants = cva('backdrop-blur-xs bg-background/20', {
  variants: {
    variant: {
      default: 'absolute top-0 z-50',
      sticky: 'sticky top-0 z-50',
    },
    scale: {
      default: 'w-full h-16',
    },
    padding: {
      default: 'px-2 sm:px-5 md:px-10 lg:px-16',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    scale: 'default',
    padding: 'default',
  },
})
interface HeaderTypes {
  className?: string
  children: ReactNode
}

const Header = React.forwardRef<HTMLElement, HeaderTypes & VariantProps<typeof HeaderVariants>>(
  ({ className, variant, padding, scale, ...props }, ref) => {
    return (
      <header
        ref={ref}
        {...props}
        className={cn(HeaderVariants({ padding, scale, className, variant }), className)}
      />
    )
  },
)
Header.displayName = 'Header'
Shell.Header = Header

interface AsideTypes {
  className?: string
  children: ReactNode
}

const Aside = React.forwardRef<HTMLElement, AsideTypes>(({ className, ...props }, ref) => {
  return (
    <aside
      ref={ref}
      {...props}
      className={cn('', className)}
    />
  )
})
Aside.displayName = 'Aside'

Shell.Aside = Aside

const FooterVariants = cva('backdrop-blur-xs', {
  variants: {
    variant: {
      default: '',
      absolute: 'absolute bottom-0 z-50',
      sticky: 'sticky bottom-0 z-50',
    },
    scale: {
      default: 'w-full h-full',
    },
    padding: {
      default: 'px-2 sm:px-5 md:px-10 lg:px-16',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    scale: 'default',
    padding: 'default',
  },
})

interface FooterTypes {
  className?: string
  children: ReactNode
}

const Footer = React.forwardRef<HTMLElement, FooterTypes & VariantProps<typeof FooterVariants>>(
  ({ className, variant, padding, scale, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        {...props}
        className={cn(FooterVariants({ className, variant, padding, scale }), className)}
      />
    )
  },
)
Footer.displayName = 'Footer'

Shell.Footer = Footer

const MainVariants = cva('relative', {
  variants: {
    variant: {
      default: 'flex flex-col',
      dashboard: 'flex flex-1 flex-col gap-4 p-4 pt-0',
      centered: 'flex flex-col justify-center items-center py-16',
    },
    scale: {
      full: 'h-full w-full',
      default: 'h-full min-h-screen w-full',
      dashboard: 'h-screen w-full',
    },
    padding: {
      default: 'px-2 sm:px-5 md:px-10 lg:px-16',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    scale: 'default',
    padding: 'default',
  },
})

interface MainTypes {
  className?: string
  children: ReactNode
}

const Main = React.forwardRef<HTMLElement, MainTypes & VariantProps<typeof MainVariants>>(
  ({ className, variant, scale, padding, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn(MainVariants({ className, variant, scale, padding }), className)}
        {...props}
      />
    )
  },
)
Main.displayName = 'Main'

Shell.Main = Main

const SectionVariants = cva('relative', {
  variants: {
    variant: {
      default: '',
      dashboard: 'flex flex-col items-start justify-start',
      center: 'flex flex-col items-center justify-center',
      table: '',
    },
    scale: {
      default: 'container mx-auto h-full w-full',
      full: 'h-full w-full',
    },
    padding: {
      default: '',
      center: 'flex flex-col items-center justify-center p-10 sm:p-16 md:p-20',
    },
  },
  defaultVariants: {
    variant: 'default',
    scale: 'default',
    padding: 'default',
  },
})

interface SectionTypes {
  className?: string
  children: ReactNode
}

const Section = React.forwardRef<HTMLElement, SectionTypes & VariantProps<typeof SectionVariants>>(
  ({ variant, className, padding, scale, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(SectionVariants({ variant, className, padding, scale }))}
        {...props}
      />
    )
  },
)
Section.displayName = 'Section'

Shell.Section = Section

export default Shell
