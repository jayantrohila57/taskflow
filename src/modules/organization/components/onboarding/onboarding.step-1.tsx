'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Info } from 'lucide-react'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { debugLog } from '@/lib/utils'
// Onboarding Basics Form
export const ONBOARDING_BASICS_TEXT = {
  NAME_LABEL: 'Organization Name',
  NAME_PLACEHOLDER: 'Acme Inc',
  NAME_DESCRIPTION: 'This is the name that will be displayed to your team members.',
  NAME_ERROR: 'Organization name must be at least 2 characters.',

  DESCRIPTION_LABEL: 'Description',
  DESCRIPTION_PLACEHOLDER: 'A brief description of your organization',
  DESCRIPTION_DESCRIPTION: 'Tell us a bit about your organization.',
  DESCRIPTION_ERROR: 'Description must be at least 10 characters.',

  WEBSITE_LABEL: 'Website',
  WEBSITE_PLACEHOLDER: 'https://example.com',
  WEBSITE_DESCRIPTION: "Your organization's website (optional).",
  WEBSITE_ERROR: 'Please enter a valid URL.',

  EMAIL_LABEL: 'Contact Email',
  EMAIL_PLACEHOLDER: 'contact@example.com',
  EMAIL_DESCRIPTION: 'This email will be used for organization communications.',
  EMAIL_ERROR: 'Please enter a valid email address.',
  EMAIL_TOOLTIP: 'This email will be visible to your team members and will receive important notifications.',

  PHONE_LABEL: 'Phone Number',
  PHONE_PLACEHOLDER: '+1 (555) 123-4567',
  PHONE_DESCRIPTION: 'A contact phone number for your organization (optional).',
}
interface BasicsFormProps {
  organizationId: string
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: ONBOARDING_BASICS_TEXT.NAME_ERROR,
  }),
  description: z.string().min(10, {
    message: ONBOARDING_BASICS_TEXT.DESCRIPTION_ERROR,
  }),
  website: z
    .string()
    .url({
      message: ONBOARDING_BASICS_TEXT.WEBSITE_ERROR,
    })
    .optional()
    .or(z.literal('')),
  email: z.string().email({
    message: ONBOARDING_BASICS_TEXT.EMAIL_ERROR,
  }),
  phone: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function BasicsForm({ organizationId }: BasicsFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'Acme Inc',
      description: '',
      website: '',
      email: '',
      phone: '',
    },
  })

  function onSubmit(values: FormValues) {
    // In a real app, you would save this data via an API
    debugLog('organizationId', { values, organizationId })
  }

  return (
    <Form {...form}>
      <form
        onChange={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{ONBOARDING_BASICS_TEXT.NAME_LABEL}</FormLabel>
              <FormControl>
                <Input
                  placeholder={ONBOARDING_BASICS_TEXT.NAME_PLACEHOLDER}
                  {...field}
                />
              </FormControl>
              <FormDescription>{ONBOARDING_BASICS_TEXT.NAME_DESCRIPTION}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{ONBOARDING_BASICS_TEXT.DESCRIPTION_LABEL}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={ONBOARDING_BASICS_TEXT.DESCRIPTION_PLACEHOLDER}
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>{ONBOARDING_BASICS_TEXT.DESCRIPTION_DESCRIPTION}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{ONBOARDING_BASICS_TEXT.WEBSITE_LABEL}</FormLabel>
              <FormControl>
                <Input
                  placeholder={ONBOARDING_BASICS_TEXT.WEBSITE_PLACEHOLDER}
                  {...field}
                />
              </FormControl>
              <FormDescription>{ONBOARDING_BASICS_TEXT.WEBSITE_DESCRIPTION}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>{ONBOARDING_BASICS_TEXT.EMAIL_LABEL}</FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{ONBOARDING_BASICS_TEXT.EMAIL_TOOLTIP}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <FormControl>
                <Input
                  placeholder={ONBOARDING_BASICS_TEXT.EMAIL_PLACEHOLDER}
                  {...field}
                />
              </FormControl>
              <FormDescription>{ONBOARDING_BASICS_TEXT.EMAIL_DESCRIPTION}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{ONBOARDING_BASICS_TEXT.PHONE_LABEL}</FormLabel>
              <FormControl>
                <Input
                  placeholder={ONBOARDING_BASICS_TEXT.PHONE_PLACEHOLDER}
                  {...field}
                />
              </FormControl>
              <FormDescription>{ONBOARDING_BASICS_TEXT.PHONE_DESCRIPTION}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
