import type { Locale } from 'next-intl'
import { HeaderActions } from './header.actions'
import HeaderLogo from './header.logo'
import { NavigationHeader } from './header.navigation'

interface PageProps {
  locale: Locale
}

export default function Header({ locale }: PageProps) {
  return (
    <nav className="container mx-auto flex h-full w-full items-center justify-between">
      <HeaderLogo />
      <NavigationHeader />
      <HeaderActions />
    </nav>
  )
}
