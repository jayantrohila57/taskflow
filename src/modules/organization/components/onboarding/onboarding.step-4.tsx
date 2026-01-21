'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CreditCard, Check, Info } from 'lucide-react'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { debugLog } from '@/lib/utils'

// Onboarding Billing Form
export const ONBOARDING_BILLING_TEXT = {
  PLAN_LABEL: 'Select a Plan',
  PLAN_DESCRIPTION: "Choose the plan that best fits your organization's needs.",

  FREE_PLAN_TITLE: 'Free',
  FREE_PLAN_PRICE: '$0/month',
  FREE_PLAN_FEATURE_1: 'Up to 5 team members',
  FREE_PLAN_FEATURE_2: 'Basic features',
  FREE_PLAN_FEATURE_3: 'Community support',

  PRO_PLAN_TITLE: 'Pro',
  PRO_PLAN_PRICE: '$49/month',
  PRO_PLAN_FEATURE_1: 'Up to 20 team members',
  PRO_PLAN_FEATURE_2: 'Advanced features',
  PRO_PLAN_FEATURE_3: 'Priority support',

  ENTERPRISE_PLAN_TITLE: 'Enterprise',
  ENTERPRISE_PLAN_PRICE: '$199/month',
  ENTERPRISE_PLAN_FEATURE_1: 'Unlimited team members',
  ENTERPRISE_PLAN_FEATURE_2: 'All features',
  ENTERPRISE_PLAN_FEATURE_3: 'Dedicated support',

  PAYMENT_TITLE: 'Payment Information',
  PAYMENT_DESCRIPTION: 'Enter your payment details to complete setup.',

  CARD_NAME_LABEL: 'Name on Card',
  CARD_NAME_PLACEHOLDER: 'John Doe',
  CARD_NAME_ERROR: 'Please enter the name on your card.',

  CARD_NUMBER_LABEL: 'Card Number',
  CARD_NUMBER_PLACEHOLDER: '1234 5678 9012 3456',
  CARD_NUMBER_ERROR: 'Please enter a valid 16-digit card number.',
  CARD_NUMBER_TOOLTIP: 'We accept Visa, Mastercard, American Express, and Discover.',

  CARD_EXPIRY_LABEL: 'Expiration Date',
  CARD_EXPIRY_PLACEHOLDER: 'MM/YY',
  CARD_EXPIRY_ERROR: 'Please enter a valid expiration date (MM/YY).',

  CARD_CVC_LABEL: 'CVC',
  CARD_CVC_PLACEHOLDER: '123',
  CARD_CVC_ERROR: 'Please enter a valid CVC code (3-4 digits).',
}

interface BillingFormProps {
  organizationId: string
}

const formSchema = z.object({
  plan: z.enum(['free', 'pro', 'enterprise']),
  cardName: z
    .string()
    .min(2, {
      message: ONBOARDING_BILLING_TEXT.CARD_NAME_ERROR,
    })
    .optional(),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, {
      message: ONBOARDING_BILLING_TEXT.CARD_NUMBER_ERROR,
    })
    .optional(),
  cardExpiry: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, {
      message: ONBOARDING_BILLING_TEXT.CARD_EXPIRY_ERROR,
    })
    .optional(),
  cardCvc: z
    .string()
    .regex(/^\d{3,4}$/, {
      message: ONBOARDING_BILLING_TEXT.CARD_CVC_ERROR,
    })
    .optional(),
})

type FormValues = z.infer<typeof formSchema>

export function BillingForm({ organizationId }: BillingFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: 'free',
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
  })

  const watchPlan = form.watch('plan')

  function onSubmit(values: FormValues) {
    // In a real app, you would save this data via an API
    debugLog('organizationId', { values, organizationId })
  }

  return (
    <Form {...form}>
      <form
        onChange={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base">{ONBOARDING_BILLING_TEXT.PLAN_LABEL}</FormLabel>
              <FormDescription>{ONBOARDING_BILLING_TEXT.PLAN_DESCRIPTION}</FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid gap-4 md:grid-cols-3"
              >
                <FormItem>
                  <FormLabel asChild>
                    <Card className={`cursor-pointer ${field.value === 'free' ? 'border-primary' : ''}`}>
                      <CardHeader>
                        <CardTitle>{ONBOARDING_BILLING_TEXT.FREE_PLAN_TITLE}</CardTitle>
                        <CardDescription>{ONBOARDING_BILLING_TEXT.FREE_PLAN_PRICE}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <Check className="text-primary mr-2 h-4 w-4" />
                            {ONBOARDING_BILLING_TEXT.FREE_PLAN_FEATURE_1}
                          </li>
                          <li className="flex items-center">
                            <Check className="text-primary mr-2 h-4 w-4" />
                            {ONBOARDING_BILLING_TEXT.FREE_PLAN_FEATURE_2}
                          </li>
                          <li className="flex items-center">
                            <Check className="text-primary mr-2 h-4 w-4" />
                            {ONBOARDING_BILLING_TEXT.FREE_PLAN_FEATURE_3}
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <FormControl>
                          <RadioGroupItem
                            value="free"
                            className="sr-only"
                          />
                        </FormControl>
                      </CardFooter>
                    </Card>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel asChild>
                    <Card className={`cursor-pointer ${field.value === 'pro' ? 'border-primary' : ''}`}>
                      <CardHeader>
                        <CardTitle>{ONBOARDING_BILLING_TEXT.PRO_PLAN_TITLE}</CardTitle>
                        <CardDescription>{ONBOARDING_BILLING_TEXT.PRO_PLAN_PRICE}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <Check className="text-primary mr-2 h-4 w-4" />
                            {ONBOARDING_BILLING_TEXT.PRO_PLAN_FEATURE_1}
                          </li>
                          <li className="flex items-center">
                            <Check className="text-primary mr-2 h-4 w-4" />
                            {ONBOARDING_BILLING_TEXT.PRO_PLAN_FEATURE_2}
                          </li>
                          <li className="flex items-center">
                            <Check className="text-primary mr-2 h-4 w-4" />
                            {ONBOARDING_BILLING_TEXT.PRO_PLAN_FEATURE_3}
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <FormControl>
                          <RadioGroupItem
                            value="pro"
                            className="sr-only"
                          />
                        </FormControl>
                      </CardFooter>
                    </Card>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel asChild>
                    <Card className={`cursor-pointer ${field.value === 'enterprise' ? 'border-primary' : ''}`}>
                      <CardHeader>
                        <CardTitle>{ONBOARDING_BILLING_TEXT.ENTERPRISE_PLAN_TITLE}</CardTitle>
                        <CardDescription>{ONBOARDING_BILLING_TEXT.ENTERPRISE_PLAN_PRICE}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <Check className="text-primary mr-2 h-4 w-4" />
                            {ONBOARDING_BILLING_TEXT.ENTERPRISE_PLAN_FEATURE_1}
                          </li>
                          <li className="flex items-center">
                            <Check className="text-primary mr-2 h-4 w-4" />
                            {ONBOARDING_BILLING_TEXT.ENTERPRISE_PLAN_FEATURE_2}
                          </li>
                          <li className="flex items-center">
                            <Check className="text-primary mr-2 h-4 w-4" />
                            {ONBOARDING_BILLING_TEXT.ENTERPRISE_PLAN_FEATURE_3}
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <FormControl>
                          <RadioGroupItem
                            value="enterprise"
                            className="sr-only"
                          />
                        </FormControl>
                      </CardFooter>
                    </Card>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        {(watchPlan === 'pro' || watchPlan === 'enterprise') && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">{ONBOARDING_BILLING_TEXT.PAYMENT_TITLE}</h3>
              <p className="text-muted-foreground text-sm">{ONBOARDING_BILLING_TEXT.PAYMENT_DESCRIPTION}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{ONBOARDING_BILLING_TEXT.CARD_NAME_LABEL}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={ONBOARDING_BILLING_TEXT.CARD_NAME_PLACEHOLDER}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel>{ONBOARDING_BILLING_TEXT.CARD_NUMBER_LABEL}</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="text-muted-foreground h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{ONBOARDING_BILLING_TEXT.CARD_NUMBER_TOOLTIP}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder={ONBOARDING_BILLING_TEXT.CARD_NUMBER_PLACEHOLDER}
                          {...field}
                        />
                        <CreditCard className="text-muted-foreground absolute top-2.5 right-3 h-4 w-4" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardExpiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{ONBOARDING_BILLING_TEXT.CARD_EXPIRY_LABEL}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={ONBOARDING_BILLING_TEXT.CARD_EXPIRY_PLACEHOLDER}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardCvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{ONBOARDING_BILLING_TEXT.CARD_CVC_LABEL}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={ONBOARDING_BILLING_TEXT.CARD_CVC_PLACEHOLDER}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
      </form>
    </Form>
  )
}
