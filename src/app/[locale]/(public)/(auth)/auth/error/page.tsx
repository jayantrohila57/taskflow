import AuthErrorPage from '@/components/shared/pages/auth-error-page'
import AuthPageLayout from '@/modules/auth/components/auth.layout'

export default function Error() {
  return (
    <AuthPageLayout
      title={'Error'}
      description={'An error occurred. Please try again.'}
    >
      <AuthErrorPage />
    </AuthPageLayout>
  )
}
