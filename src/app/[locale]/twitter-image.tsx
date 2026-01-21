import { ImageResponse } from 'next/og'
import { getTranslations } from 'next-intl/server'
import type { Locale } from 'next-intl'

interface Params {
  locale: Locale
}

export default async function TwitterImage({ params }: { params: Params }) {
  const { locale } = params
  const t = await getTranslations({ locale })

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #333333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333333 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: '40px 80px',
            borderRadius: '16px',
            border: '1px solid #333333',
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #ffffff, #cccccc)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 20,
            }}
          >
            {t('TITLE')}
          </div>
          <div
            style={{
              fontSize: 30,
              color: '#999999',
              textAlign: 'center',
              maxWidth: '600px',
            }}
          >
            {t('DESCRIPTION')}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
