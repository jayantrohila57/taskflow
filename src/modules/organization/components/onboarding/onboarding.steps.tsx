import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Users, Paintbrush, CreditCard, ClipboardList, ChevronRight } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

const ONBOARDING_TEXT = {
  TITLE: 'Organization Onboarding',
  SUBTITLE: 'Complete these steps to set up your organization.',
  BACK_TO_ORGANIZATION: 'Back to Organization',
  STEP_1_TITLE: 'Basic Information',
  STEP_1_DESCRIPTION: "Provide your organization's name, industry, and other essential details.",
  STEP_2_TITLE: 'Team Members',
  STEP_2_DESCRIPTION: 'Invite colleagues by email and assign roles for collaboration.',
  STEP_3_TITLE: 'Branding',
  STEP_3_DESCRIPTION: 'Upload your logo and select brand colors to personalize your experience.',
  STEP_4_TITLE: 'Billing',
  STEP_4_DESCRIPTION: 'Select a subscription plan and add your payment method securely.',
  STEP_5_TITLE: 'Review',
  STEP_5_DESCRIPTION: 'Double-check all details before launching your organization setup.',
  START_STEP: 'Start',
}

const steps = [
  {
    id: 'basics',
    step: 1,
    title: ONBOARDING_TEXT.STEP_1_TITLE,
    description: ONBOARDING_TEXT.STEP_1_DESCRIPTION,
    icon: <ClipboardList className="h-5 w-5" />,
    isCompleted: true,
  },
  {
    id: 'team',
    step: 2,
    title: ONBOARDING_TEXT.STEP_2_TITLE,
    description: ONBOARDING_TEXT.STEP_2_DESCRIPTION,
    icon: <Users className="h-5 w-5" />,
    isCompleted: true,
  },
  {
    id: 'branding',
    step: 3,
    title: ONBOARDING_TEXT.STEP_3_TITLE,
    description: ONBOARDING_TEXT.STEP_3_DESCRIPTION,
    icon: <Paintbrush className="h-5 w-5" />,
  },
  {
    id: 'billing',
    step: 4,
    title: ONBOARDING_TEXT.STEP_4_TITLE,
    description: ONBOARDING_TEXT.STEP_4_DESCRIPTION,
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: 'review',
    step: 5,
    title: ONBOARDING_TEXT.STEP_5_TITLE,
    description: ONBOARDING_TEXT.STEP_5_DESCRIPTION,
    icon: <CheckCircle className="h-5 w-5" />,
  },
]

export default async function OrganizationOnboarding() {
  return (
    <ol className="space-y-2">
      {steps.map((step) => {
        const stepProgress =
          (steps.filter((s) => s.step < step.step && s.isCompleted).length /
            steps.filter((s) => s.step < step.step).length) *
            100 || 0

        return (
          <li
            key={step.id}
            className="list-none"
          >
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-md border`}>{step.icon}</div>
                <div>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </div>
              </CardHeader>

              <CardFooter className="grid w-full grid-cols-12">
                {step.isCompleted ? (
                  <div className="col-span-10 flex items-center space-x-2">
                    <Progress
                      value={100}
                      className="h-2 w-full max-w-2xl"
                    />
                    <Badge variant="default">{'Complete'}</Badge>
                  </div>
                ) : (
                  <div className="col-span-10 flex items-center space-x-2">
                    <Progress
                      value={stepProgress}
                      className="h-2 w-full max-w-2xl"
                    />
                    <div className="text-muted-foreground flex-row gap-2 text-sm">
                      {stepProgress.toFixed(0)}
                      {'%'}
                    </div>
                    <Badge variant="outline">{'Pending'}</Badge>
                  </div>
                )}
                <div className="col-span-2 flex items-end justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </li>
        )
      })}
    </ol>
  )
}
