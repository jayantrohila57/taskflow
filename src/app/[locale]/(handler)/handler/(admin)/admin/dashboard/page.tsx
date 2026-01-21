import { auth } from '@/packages/next-auth'
import type { Locale } from 'next-intl'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark as style } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  const session = await auth()
  const jsonString = JSON.stringify({ locale, session }, null, 2)
  return (
    <SyntaxHighlighter
      language="javascript"
      style={style}
    >
      {jsonString}
    </SyntaxHighlighter>
  )
}
