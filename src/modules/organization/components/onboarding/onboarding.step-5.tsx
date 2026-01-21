'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormDescription, FormControl } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { debugLog } from '@/lib/utils'

interface BillingFormProps {
  organizationId: string
}

// schema
const schema = z.object({
  isPublic: z.boolean(),
  allowMemberInvites: z.boolean(),
  requireMemberApproval: z.boolean(),
  enableSso: z.boolean(),
  enableTwoFactor: z.boolean(),
})
type FormValues = z.infer<typeof schema>

// constants
const FIELDS: {
  name: keyof FormValues
  label: string
  description: string
}[] = [
  {
    name: 'isPublic',
    label: 'Public Profile',
    description: 'Allow public access to organization info.',
  },
  {
    name: 'allowMemberInvites',
    label: 'Allow Member Invites',
    description: 'Let members invite others.',
  },
  {
    name: 'requireMemberApproval',
    label: 'Require Approval',
    description: 'Admin approval needed for new members.',
  },
  {
    name: 'enableSso',
    label: 'Enable SSO',
    description: 'Allow login via SSO provider.',
  },
  {
    name: 'enableTwoFactor',
    label: 'Enable 2FA',
    description: 'Require 2FA for all members.',
  },
]

export default function OrganizationSettings({ organizationId }: BillingFormProps) {
  const [loading, setLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      isPublic: false,
      allowMemberInvites: false,
      requireMemberApproval: false,
      enableSso: false,
      enableTwoFactor: false,
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)
      debugLog('OrganizationSettings:FORM', { data, organizationId })
      await new Promise((res) => setTimeout(res, 1000))
    } catch (error) {
      debugLog('OrganizationSettings:FORM', 'Error updating settings', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {FIELDS?.map((field) => (
              <FormField
                key={field?.name}
                control={form.control}
                name={field?.name}
                render={({ field: controllerField }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>{field?.label}</FormLabel>
                      <FormDescription>{field?.description}</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={controllerField.value}
                        onCheckedChange={controllerField.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
