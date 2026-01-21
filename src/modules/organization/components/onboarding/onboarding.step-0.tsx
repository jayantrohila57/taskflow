import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
  StepperSeparator,
} from '@/components/ui/stepper'

export const ONBOARDING_TEXT = {
  TITLE: 'Organization Onboarding',
  SUBTITLE: 'Complete these steps to set up your organization.',
  BACK_TO_ORGANIZATION: 'Back to Organization',
  STEP_1_TITLE: 'Basic Information',
  STEP_1_DESCRIPTION: "Set up your organization's basic details.",
  STEP_2_TITLE: 'Team Members',
  STEP_2_DESCRIPTION: 'Invite your team members to join.',
  STEP_3_TITLE: 'Branding',
  STEP_3_DESCRIPTION: "Customize your organization's appearance.",
  STEP_4_TITLE: 'Billing',
  STEP_4_DESCRIPTION: 'Choose a plan and set up payment.',
  STEP_5_TITLE: 'Review',
  STEP_5_DESCRIPTION: 'Review your organization setup.',
  START_STEP: 'Start',
}
export default async function OnboardingSteps() {
  const steps = [
    {
      id: 'basics',
      step: 1,
      title: ONBOARDING_TEXT.STEP_1_TITLE,
      description: ONBOARDING_TEXT.STEP_1_DESCRIPTION,
    },
    {
      id: 'team',
      step: 2,
      title: ONBOARDING_TEXT.STEP_2_TITLE,
      description: ONBOARDING_TEXT.STEP_2_DESCRIPTION,
    },
    {
      id: 'branding',
      step: 3,
      title: ONBOARDING_TEXT.STEP_3_TITLE,
      description: ONBOARDING_TEXT.STEP_3_DESCRIPTION,
    },
    {
      id: 'billing',
      step: 4,
      title: ONBOARDING_TEXT.STEP_4_TITLE,
      description: ONBOARDING_TEXT.STEP_4_DESCRIPTION,
    },
    {
      id: 'review',
      step: 5,
      title: ONBOARDING_TEXT.STEP_5_TITLE,
      description: ONBOARDING_TEXT.STEP_5_DESCRIPTION,
    },
  ]

  return (
    <div className="h-full w-full space-y-8 text-center">
      <Stepper
        defaultValue={1}
        orientation="vertical"
      >
        {steps.map(({ step, title, description }) => (
          <StepperItem
            key={step}
            step={step}
            className="relative items-start not-last:flex-1"
          >
            <StepperTrigger className="items-start rounded pb-12 last:pb-0">
              <StepperIndicator className="rounded-sm" />
              <div className="mt-0.5 space-y-0.5 px-2 text-left">
                <StepperTitle>{title}</StepperTitle>
                <StepperDescription>{description}</StepperDescription>
              </div>
            </StepperTrigger>
            {step < steps.length && (
              <StepperSeparator className="absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]" />
            )}
          </StepperItem>
        ))}
      </Stepper>
    </div>
  )
}
