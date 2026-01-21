import type { UseFormReturn } from 'react-hook-form'
import type { OrganizationFormValues } from '../organization-edit.form'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { messages } from '@/lib/messages'

export function ContactInfoSection({ form }: { form: UseFormReturn<OrganizationFormValues> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{messages.FORM_SECTIONS.CONTACT_INFO.TITLE}</CardTitle>
        <CardDescription>{messages.FORM_SECTIONS.CONTACT_INFO.DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="primaryEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{messages.FORM_SECTIONS.CONTACT_INFO.PRIMARY_EMAIL}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={messages.FORM_SECTIONS.CONTACT_INFO.PRIMARY_EMAIL_PLACEHOLDER}
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormDescription>{messages.FORM_SECTIONS.CONTACT_INFO.PRIMARY_EMAIL_DESCRIPTION}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
