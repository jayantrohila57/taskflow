import type { UseFormReturn } from 'react-hook-form'
import type { OrganizationFormValues } from '../organization-edit.form'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { messages } from '@/lib/messages'

export function StatusSection({ form }: { form: UseFormReturn<OrganizationFormValues> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{messages.FORM_SECTIONS.STATUS.TITLE}</CardTitle>
        <CardDescription>{messages.FORM_SECTIONS.STATUS.DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{messages.FORM_SECTIONS.STATUS.ACTIVE}</FormLabel>
                <FormDescription>{messages.FORM_SECTIONS.STATUS.ACTIVE_DESCRIPTION}</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isVerified"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{messages.FORM_SECTIONS.STATUS.VERIFIED}</FormLabel>
                <FormDescription>{messages.FORM_SECTIONS.STATUS.VERIFIED_DESCRIPTION}</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{messages.FORM_SECTIONS.STATUS.PUBLIC}</FormLabel>
                <FormDescription>{messages.FORM_SECTIONS.STATUS.PUBLIC_DESCRIPTION}</FormDescription>
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
