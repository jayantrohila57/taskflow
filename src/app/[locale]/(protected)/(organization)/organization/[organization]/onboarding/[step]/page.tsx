import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, Info } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Link } from '@/packages/next-intl/utils/navigation'
import { BasicsForm } from '@/modules/organization/components/onboarding/onboarding.step-1'
import { TeamForm } from '@/modules/organization/components/onboarding/onboarding.step-2'
import { BrandingForm } from '@/modules/organization/components/onboarding/onboarding.step-3'
import OrganizationSettings from '@/modules/organization/components/onboarding/onboarding.step-5'
import Shell from '@/components/shared/shell/shell'
import OnboardingPageLayout from '@/modules/organization/components/onboarding/onboarding.layout'

const ONBOARDING_STEPS_TEXT = {
  BACK_TO_STEPS: 'Back to Steps',
  STEP: 'Step',
  OF: 'of',

  STEP_1_TITLE: 'Basic Information',
  STEP_1_DESCRIPTION: "Set up your organization's basic details.",

  STEP_2_TITLE: 'Team Members',
  STEP_2_DESCRIPTION: 'Invite your team members to join.',

  STEP_3_TITLE: 'Branding',
  STEP_3_DESCRIPTION: "Customize your organization's appearance.",

  STEP_4_TITLE: 'Organization Settings',
  STEP_4_DESCRIPTION: "Configure your organization's key settings.",

  PREVIOUS: 'Previous',
  NEXT: 'Next',
  COMPLETE: 'Complete',

  INFO: 'Information',
  TOOLTIP_PREFIX: 'This step helps you set up',

  GETTING_STARTED_TITLE: 'Getting Started',
  GETTING_STARTED_DESCRIPTION:
    'Fill out the information below to set up your organization. You can always change these details later.',
}
interface OnboardingStepPageProps {
  params: Promise<{
    id: string
    step: string
  }>
}

export default async function OnboardingStepPage({ params }: OnboardingStepPageProps) {
  const { id, step } = await params
  const steps = [
    {
      id: 'basics',
      title: ONBOARDING_STEPS_TEXT.STEP_1_TITLE,
      component: BasicsForm,
    },
    {
      id: 'team',
      title: ONBOARDING_STEPS_TEXT.STEP_2_TITLE,
      component: TeamForm,
    },
    {
      id: 'branding',
      title: ONBOARDING_STEPS_TEXT.STEP_3_TITLE,
      component: BrandingForm,
    },
    {
      id: 'settings',
      title: ONBOARDING_STEPS_TEXT.STEP_4_TITLE,
      component: OrganizationSettings,
    },
  ]

  const currentStepIndex = steps.findIndex((s) => s?.id === step)

  if (currentStepIndex === -1) {
    return notFound()
  }

  const currentStep = steps[currentStepIndex]!
  const StepComponent = currentStep.component
  const nextStep = steps[currentStepIndex + 1]!
  const prevStep = steps[currentStepIndex - 1]!

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
          <Card className="h-full w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{currentStep?.title}</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <Info className="h-4 w-4" />
                        <span className="sr-only">{ONBOARDING_STEPS_TEXT.INFO}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {ONBOARDING_STEPS_TEXT.TOOLTIP_PREFIX} {currentStep.title.toLowerCase()}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <CardDescription>
                {
                  ONBOARDING_STEPS_TEXT[
                    `STEP_${currentStepIndex + 1}_DESCRIPTION` as keyof typeof ONBOARDING_STEPS_TEXT
                  ]
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentStepIndex === 0 && (
                <Alert
                  variant="default"
                  className="mb-6"
                >
                  <Info className="h-4 w-4" />
                  <AlertTitle>{ONBOARDING_STEPS_TEXT.GETTING_STARTED_TITLE}</AlertTitle>
                  <AlertDescription>{ONBOARDING_STEPS_TEXT.GETTING_STARTED_DESCRIPTION}</AlertDescription>
                </Alert>
              )}

              <StepComponent organizationId={id} />
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button
                variant="outline"
                disabled={currentStepIndex === 0}
                asChild={currentStepIndex > 0}
              >
                {currentStepIndex > 0 ? (
                  <Link href={`/organization/1/onboarding/${prevStep?.id}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {ONBOARDING_STEPS_TEXT.PREVIOUS}
                  </Link>
                ) : (
                  <>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {ONBOARDING_STEPS_TEXT.PREVIOUS}
                  </>
                )}
              </Button>
              <Button asChild={currentStepIndex < steps.length - 1}>
                {currentStepIndex < steps.length - 1 ? (
                  <Link href={`/organization/1/onboarding/${nextStep?.id}`}>
                    {ONBOARDING_STEPS_TEXT.NEXT}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                ) : (
                  <Link href={`/organization/onboarding/${id}?id=${nextStep?.id}`}>
                    {ONBOARDING_STEPS_TEXT.COMPLETE}
                    <Check className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </Button>
            </CardFooter>
          </Card>
        </OnboardingPageLayout>
      </Shell.Section>
    </Shell>
  )
}
