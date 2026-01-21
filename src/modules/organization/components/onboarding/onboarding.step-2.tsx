'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Plus, Trash2, User, Mail } from 'lucide-react'

import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { debugLog } from '@/lib/utils'

// Onboarding Team Form
export const ONBOARDING_TEAM_TEXT = {
  INVITE_TITLE: 'Invite Team Members',
  INVITE_DESCRIPTION: 'Add team members to your organization.',

  EMAIL_LABEL: 'Email Address',
  EMAIL_PLACEHOLDER: 'colleague@example.com',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_ERROR: 'Please enter a valid email address',
  EMAIL_EXISTS: 'This email has already been added',

  ROLE_LABEL: 'Role',
  ADMIN_ROLE: 'Admin',
  MEMBER_ROLE: 'Member',

  ADD_BUTTON: 'Add',

  TEAM_MEMBERS_TITLE: 'Team Members',
  TEAM_MEMBERS_DESCRIPTION: 'People who will have access to your organization.',

  NO_MEMBERS: 'No team members added yet',
  ADD_MEMBERS_PROMPT: 'Add team members using the form above',

  REMOVE: 'Remove',
}

interface TeamFormProps {
  organizationId: string
}

const memberSchema = z.object({
  email: z.string().email({
    message: ONBOARDING_TEAM_TEXT.EMAIL_ERROR,
  }),
  role: z.enum(['admin', 'member']),
})

const formSchema = z.object({
  members: z.array(memberSchema),
})

type FormValues = z.infer<typeof formSchema>

export function TeamForm({ organizationId }: TeamFormProps) {
  const [pendingEmail, setPendingEmail] = useState('')
  const [pendingRole, setPendingRole] = useState<'admin' | 'member'>('member')
  const [emailError, setEmailError] = useState('')

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      members: [],
    },
  })

  function addMember() {
    if (!pendingEmail) {
      setEmailError(ONBOARDING_TEAM_TEXT.EMAIL_REQUIRED)
      return
    }

    if (!z.string().email().safeParse(pendingEmail).success) {
      setEmailError(ONBOARDING_TEAM_TEXT.EMAIL_ERROR)
      return
    }

    const existingMember = form.getValues().members.find((member) => member.email === pendingEmail)

    if (existingMember) {
      setEmailError(ONBOARDING_TEAM_TEXT.EMAIL_EXISTS)
      return
    }

    form.setValue('members', [...form.getValues().members, { email: pendingEmail, role: pendingRole }])

    setPendingEmail('')
    setEmailError('')
  }

  function removeMember(index: number) {
    const members = form.getValues().members
    members.splice(index, 1)
    form.setValue('members', [...members])
  }

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
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">{ONBOARDING_TEAM_TEXT.INVITE_TITLE}</h3>
            <p className="text-muted-foreground text-sm">{ONBOARDING_TEAM_TEXT.INVITE_DESCRIPTION}</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium"
              >
                {ONBOARDING_TEAM_TEXT.EMAIL_LABEL}
              </label>
              <Input
                id="email"
                placeholder={ONBOARDING_TEAM_TEXT.EMAIL_PLACEHOLDER}
                value={pendingEmail}
                onChange={(e) => {
                  setPendingEmail(e.target.value)
                  setEmailError('')
                }}
              />
              {emailError && <p className="text-destructive text-xs">{emailError}</p>}
            </div>
            <div className="space-y-1">
              <label
                htmlFor="role"
                className="text-sm font-medium"
              >
                {ONBOARDING_TEAM_TEXT.ROLE_LABEL}
              </label>
              <select
                id="role"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                value={pendingRole}
                onChange={(e) => setPendingRole(e.target.value as 'admin' | 'member')}
              >
                <option value="admin">{ONBOARDING_TEAM_TEXT.ADMIN_ROLE}</option>
                <option value="member">{ONBOARDING_TEAM_TEXT.MEMBER_ROLE}</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                onClick={addMember}
              >
                <Plus className="mr-2 h-4 w-4" />
                {ONBOARDING_TEAM_TEXT.ADD_BUTTON}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">{ONBOARDING_TEAM_TEXT.TEAM_MEMBERS_TITLE}</h3>
            <p className="text-muted-foreground text-sm">{ONBOARDING_TEAM_TEXT.TEAM_MEMBERS_DESCRIPTION}</p>
          </div>

          <FormField
            control={form.control}
            name="members"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-2">
                  {field.value.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <User className="text-muted-foreground h-8 w-8" />
                        <p className="mt-2 text-center text-sm font-medium">{ONBOARDING_TEAM_TEXT.NO_MEMBERS}</p>
                        <p className="text-muted-foreground text-center text-sm">
                          {ONBOARDING_TEAM_TEXT.ADD_MEMBERS_PROMPT}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-2">
                      {field.value.map((member, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-md border p-3"
                        >
                          <div className="flex items-center gap-3">
                            <Mail className="text-muted-foreground h-4 w-4" />
                            <div>
                              <p className="text-sm font-medium">{member.email}</p>
                              <Badge
                                variant="outline"
                                className="mt-1"
                              >
                                {member.role === 'admin'
                                  ? ONBOARDING_TEAM_TEXT.ADMIN_ROLE
                                  : ONBOARDING_TEAM_TEXT.MEMBER_ROLE}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMember(index)}
                          >
                            <Trash2 className="text-muted-foreground h-4 w-4" />
                            <span className="sr-only">{ONBOARDING_TEAM_TEXT.REMOVE}</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
