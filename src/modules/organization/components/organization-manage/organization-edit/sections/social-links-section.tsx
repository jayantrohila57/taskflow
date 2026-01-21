'use client'

import type { UseFormReturn } from 'react-hook-form'
import { useFieldArray } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { messages } from '@/lib/messages'
import type { SocialLink } from '@prisma/client'
import type { OrganizationFormValues } from '../organization-edit.form'

export function SocialLinksSection({ form }: { form: UseFormReturn<OrganizationFormValues> }) {
  const {
    fields: socialLinks,
    append: appendSocialLink,
    remove: removeSocialLink,
  } = useFieldArray({
    control: form.control,
    name: 'socialLinks',
  })

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{messages.FORM_SECTIONS.SOCIAL_LINKS.TITLE}</CardTitle>
        <CardDescription>{messages.FORM_SECTIONS.SOCIAL_LINKS.DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {socialLinks && socialLinks.length > 0 ? (
          <div className="space-y-4">
            {socialLinks.map((link, index) => (
              <div
                key={link.id}
                className="flex items-end gap-2"
              >
                <div className="flex-1 space-y-2">
                  <FormField
                    control={form.control}
                    name={`socialLinks.${index}.platform`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? 'sr-only' : undefined}>
                          {messages.FORM_SECTIONS.SOCIAL_LINKS.PLATFORM}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={messages.FORM_SECTIONS.SOCIAL_LINKS.PLATFORM_PLACEHOLDER}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-[2] space-y-2">
                  <FormField
                    control={form.control}
                    name={`socialLinks.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? 'sr-only' : undefined}>
                          {messages.FORM_SECTIONS.SOCIAL_LINKS.URL}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={messages.FORM_SECTIONS.SOCIAL_LINKS.URL_PLACEHOLDER}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSocialLink(index)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">{messages.COMMON.REMOVE}</span>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[100px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">{messages.FORM_SECTIONS.SOCIAL_LINKS.NO_LINKS}</p>
            </div>
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => appendSocialLink({ platform: '', url: '' })}
        >
          <Plus className="mr-2 h-4 w-4" />
          {messages.FORM_SECTIONS.SOCIAL_LINKS.ADD}
        </Button>
      </CardContent>
    </Card>
  )
}
