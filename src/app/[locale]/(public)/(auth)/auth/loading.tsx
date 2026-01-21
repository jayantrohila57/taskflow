import LoadingComponent from '@/components/shared/pages/loading-page'
import Shell from '@/components/shared/shell/shell'
import { default as AuthPageLayout } from '@/modules/auth/components/auth.layout'

export default function LoadingPage() {
  return (
    <Shell>
      <Shell.Section>
        <AuthPageLayout
          title={'Loading...'}
          description={'Please wait while we load your content'}
        >
          <LoadingComponent />
        </AuthPageLayout>
      </Shell.Section>
    </Shell>
  )
}
