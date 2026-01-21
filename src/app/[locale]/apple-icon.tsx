import { ImageResponse } from 'next/og'
import { getTranslations } from 'next-intl/server'
import type { Locale } from 'next-intl'

interface Params {
  locale: Locale
}

export default async function AppleIcon({ params }: { params: Params }) {
  const { locale } = params
  const t = await getTranslations({ locale })

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          borderRadius: '22%',
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #ffffff, #cccccc)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {t('TITLE').charAt(0)}
        </div>
      </div>
    ),
    {
      width: 180,
      height: 180,
    },
  )
}
