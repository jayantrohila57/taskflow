import { Loader } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function LoadingComponent() {
  const t = await getTranslations()

  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-10 backdrop-blur-sm">
      <Loader className="h-6 w-6 animate-spin" />
      <p className="text-muted-foreground mx-auto max-w-screen-md text-center md:text-lg">{t('COMMON.LOADING')}</p>
    </div>
  )
}
