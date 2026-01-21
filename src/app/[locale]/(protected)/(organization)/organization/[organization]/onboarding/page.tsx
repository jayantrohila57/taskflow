import Shell from '@/components/shared/shell/shell'
import OnboardingPageLayout from '@/modules/organization/components/onboarding/onboarding.layout'
import OrganizationOnboarding from '@/modules/organization/components/onboarding/onboarding.steps'
import type { Locale } from 'next-intl'

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function OrganizationPage({ params }: PageProps) {
  const { locale } = await params

  return (
    <Shell>
      <Shell.Section
        variant={'dashboard'}
        scale="full"
      >
        <OnboardingPageLayout
          title="Organization Onboarding"
          description="Complete these steps to set up your organization."
        >
          <OrganizationOnboarding />
        </OnboardingPageLayout>
      </Shell.Section>
    </Shell>
  )
}
