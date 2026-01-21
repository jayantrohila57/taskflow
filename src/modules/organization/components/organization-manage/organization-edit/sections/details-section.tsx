'use client'

import type { UseFormReturn } from 'react-hook-form'
import type { OrganizationFormValues } from '../organization-edit.form'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { messages } from '@/lib/messages'

export function DetailsSection({ form }: { form: UseFormReturn<OrganizationFormValues> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{messages.FORM_SECTIONS.DETAILS.TITLE}</CardTitle>
        <CardDescription>{messages.FORM_SECTIONS.DETAILS.DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="missionStatement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{messages.FORM_SECTIONS.DETAILS.MISSION}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={messages.FORM_SECTIONS.DETAILS.MISSION_PLACEHOLDER}
                  className="min-h-[100px]"
                  {...field}
                  value={field.value || ''} // Ensure value is always a string for Textarea
                />
              </FormControl>
              <FormDescription>{messages.FORM_SECTIONS.DETAILS.MISSION_DESCRIPTION}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="visionStatement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{messages.FORM_SECTIONS.DETAILS.VISION}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={messages.FORM_SECTIONS.DETAILS.VISION_PLACEHOLDER}
                  className="min-h-[100px]"
                  {...field}
                  value={field.value || ''} // Ensure value is always a string for Textarea
                />
              </FormControl>
              <FormDescription>{messages.FORM_SECTIONS.DETAILS.VISION_DESCRIPTION}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="foundedYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{messages.FORM_SECTIONS.DETAILS.FOUNDED_YEAR}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={messages.FORM_SECTIONS.DETAILS.FOUNDED_YEAR_PLACEHOLDER}
                  {...field}
                  value={field.value || ''} // Input value should be a string
                  onChange={(e) => {
                    const value = e.target.value
                    // Convert the string value to a number or null if empty
                    field.onChange(value ? Number.parseInt(value, 10) : null)
                  }}
                />
              </FormControl>
              <FormDescription>{messages.FORM_SECTIONS.DETAILS.FOUNDED_YEAR_DESCRIPTION}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
