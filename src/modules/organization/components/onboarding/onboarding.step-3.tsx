'use client'

import type React from 'react'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Upload, Info, Palette } from 'lucide-react'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { debugLog } from '@/lib/utils'

// Onboarding Branding Form
export const ONBOARDING_BRANDING_TEXT = {
  PRIMARY_COLOR_LABEL: 'Primary Color',
  PRIMARY_COLOR_DESCRIPTION: 'Used for buttons, links, and accents.',
  PRIMARY_COLOR_TOOLTIP: "This color will be used as the main brand color throughout your organization's interface.",
  COLOR_ERROR: 'Please enter a valid hex color code (e.g., #FF0000).',

  SECONDARY_COLOR_LABEL: 'Secondary Color',
  SECONDARY_COLOR_DESCRIPTION: 'Used for backgrounds and secondary elements.',
  SECONDARY_COLOR_TOOLTIP: 'This color will be used for backgrounds and secondary UI elements.',

  LOGO_LABEL: 'Organization Logo',
  LOGO_DESCRIPTION: "Upload your organization's logo.",
  LOGO_TOOLTIP: 'Your logo will appear in the navigation bar and other prominent places.',
  LOGO_FORMATS: 'SVG, PNG, or JPG (max 2MB)',
  UPLOAD_LOGO: 'Upload Logo',

  FAVICON_LABEL: 'Favicon',
  FAVICON_DESCRIPTION: 'Upload a small icon for browser tabs.',
  FAVICON_TOOLTIP: 'This icon will appear in browser tabs and bookmarks.',
  FAVICON_FORMATS: 'ICO, PNG, or SVG (max 1MB)',
  UPLOAD_FAVICON: 'Upload Favicon',
}
interface BrandingFormProps {
  organizationId: string
}

const formSchema = z.object({
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: ONBOARDING_BRANDING_TEXT.COLOR_ERROR,
  }),
  secondaryColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
      message: ONBOARDING_BRANDING_TEXT.COLOR_ERROR,
    })
    .optional(),
  logoUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function BrandingForm({ organizationId }: BrandingFormProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      logoUrl: '',
      faviconUrl: '',
    },
  })

  function onSubmit(values: FormValues) {
    // In a real app, you would save this data via an API
    debugLog('organizationId', { values, organizationId })
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFaviconPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Form {...form}>
      <form
        onChange={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="primaryColor"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>{ONBOARDING_BRANDING_TEXT.PRIMARY_COLOR_LABEL}</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="text-muted-foreground h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{ONBOARDING_BRANDING_TEXT.PRIMARY_COLOR_TOOLTIP}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      {...field}
                      className="h-10 w-10 p-1"
                    />
                    <Input
                      {...field}
                      className="flex-1"
                    />
                  </div>
                </FormControl>
                <FormDescription>{ONBOARDING_BRANDING_TEXT.PRIMARY_COLOR_DESCRIPTION}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondaryColor"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>{ONBOARDING_BRANDING_TEXT.SECONDARY_COLOR_LABEL}</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="text-muted-foreground h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{ONBOARDING_BRANDING_TEXT.SECONDARY_COLOR_TOOLTIP}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      {...field}
                      className="h-10 w-10 p-1"
                    />
                    <Input
                      {...field}
                      className="flex-1"
                    />
                  </div>
                </FormControl>
                <FormDescription>{ONBOARDING_BRANDING_TEXT.SECONDARY_COLOR_DESCRIPTION}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">{ONBOARDING_BRANDING_TEXT.LOGO_LABEL}</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{ONBOARDING_BRANDING_TEXT.LOGO_TOOLTIP}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-muted-foreground text-xs">{ONBOARDING_BRANDING_TEXT.LOGO_DESCRIPTION}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-md border">
                {logoPreview ? (
                  <img
                    src={logoPreview || '/placeholder.svg'}
                    alt="Logo preview"
                    className="max-h-full max-w-full"
                  />
                ) : (
                  <Palette className="text-muted-foreground h-8 w-8" />
                )}
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="mb-2"
                  asChild
                >
                  <label>
                    <Upload className="mr-2 h-4 w-4" />
                    {ONBOARDING_BRANDING_TEXT.UPLOAD_LOGO}
                    <input
                      type="file"
                      className="sr-only"
                      onChange={handleLogoChange}
                      accept="image/*"
                    />
                  </label>
                </Button>
                <p className="text-muted-foreground text-xs">{ONBOARDING_BRANDING_TEXT.LOGO_FORMATS}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">{ONBOARDING_BRANDING_TEXT.FAVICON_LABEL}</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{ONBOARDING_BRANDING_TEXT.FAVICON_TOOLTIP}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-muted-foreground text-xs">{ONBOARDING_BRANDING_TEXT.FAVICON_DESCRIPTION}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-md border">
                {faviconPreview ? (
                  <img
                    src={faviconPreview || '/placeholder.svg'}
                    alt="Favicon preview"
                    className="max-h-full max-w-full"
                  />
                ) : (
                  <Palette className="text-muted-foreground h-8 w-8" />
                )}
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="mb-2"
                  asChild
                >
                  <label>
                    <Upload className="mr-2 h-4 w-4" />
                    {ONBOARDING_BRANDING_TEXT.UPLOAD_FAVICON}
                    <input
                      type="file"
                      className="sr-only"
                      onChange={handleFaviconChange}
                      accept="image/*"
                    />
                  </label>
                </Button>
                <p className="text-muted-foreground text-xs">{ONBOARDING_BRANDING_TEXT.FAVICON_FORMATS}</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
