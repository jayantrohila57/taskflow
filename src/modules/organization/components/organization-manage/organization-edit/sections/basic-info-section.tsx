'use client'

import type React from 'react'

import type { UseFormReturn } from 'react-hook-form'
import { Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { messages } from '@/lib/messages'
import type { OrganizationFormValues } from '../organization-edit.form'

interface BasicInfoSectionProps {
  form: UseFormReturn<OrganizationFormValues>
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function BasicInfoSection({ form, handleTitleChange }: BasicInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{messages.FORM_SECTIONS.BASIC_INFO.TITLE}</CardTitle>
        <CardDescription>{messages.FORM_SECTIONS.BASIC_INFO.DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{messages.FORM_SECTIONS.BASIC_INFO.NAME}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={messages.FORM_SECTIONS.BASIC_INFO.NAME_PLACEHOLDER}
                    {...field}
                    onChange={handleTitleChange}
                  />
                </FormControl>
                <FormDescription>{messages.FORM_SECTIONS.BASIC_INFO.NAME_DESCRIPTION}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{messages.FORM_SECTIONS.BASIC_INFO.SLUG}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={messages.FORM_SECTIONS.BASIC_INFO.SLUG_PLACEHOLDER}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{messages.FORM_SECTIONS.BASIC_INFO.SLUG_DESCRIPTION}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{messages.FORM_SECTIONS.BASIC_INFO.DESCRIPTION}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={messages.FORM_SECTIONS.BASIC_INFO.DESCRIPTION_PLACEHOLDER}
                  className="min-h-[100px]"
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormDescription>{messages.FORM_SECTIONS.BASIC_INFO.DESCRIPTION_HELP}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{messages.FORM_SECTIONS.BASIC_INFO.LOGO}</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4">
                    {field.value && (
                      <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                        <img
                          src={field.value || '/placeholder.svg'}
                          alt="Logo"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {messages.FORM_SECTIONS.BASIC_INFO.UPLOAD_LOGO}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>{messages.FORM_SECTIONS.BASIC_INFO.LOGO_DESCRIPTION}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{messages.FORM_SECTIONS.BASIC_INFO.COVER}</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4">
                    {field.value && (
                      <div className="relative h-16 w-32 overflow-hidden rounded-md border">
                        <img
                          src={field.value || '/placeholder.svg'}
                          alt="Cover"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {messages.FORM_SECTIONS.BASIC_INFO.UPLOAD_COVER}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>{messages.FORM_SECTIONS.BASIC_INFO.COVER_DESCRIPTION}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
