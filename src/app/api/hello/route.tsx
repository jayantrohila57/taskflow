import { type NextRequest, NextResponse } from 'next/server'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { routing } from '@/packages/next-intl/utils/routing'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale')
  if (!hasLocale(routing.locales, locale)) {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })
  }

  const t = await getTranslations({ locale })
  return NextResponse.json({ title: t('TITLE') })
}
