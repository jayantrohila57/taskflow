'use client'

import type React from 'react'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { messages } from '@/lib/messages'

// Import form sections
import { BasicInfoSection } from './sections/basic-info-section'
import { ContactInfoSection } from './sections/contact-info-section'
import { DetailsSection } from './sections/details-section'
import { LocalizationSection } from './sections/localization-section'
import { StatusSection } from './sections/status-section'
import { RelationsSection } from './sections/relations-section'
import { SocialLinksSection } from './sections/social-links-section'
import { AddressesSection } from './sections/addresses-section'

// Mock data for selects
import {
  statusOptions,
  typeOptions,
  categoryOptions,
  industryOptions,
  sizeOptions,
  timezoneOptions,
  languageOptions,
  currencyOptions,
  dateFormatOptions,
  timeFormatOptions,
} from '../organization-form-data'
import { useRouter } from '@/packages/next-intl/utils/navigation'
import { debugLog } from '@/lib/utils'

// Zod schema for organization form
const organizationFormSchema = z.object({
  // Core Identification
  id: z.string().optional(),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  image: z.string().optional().nullable(),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),

  // Contact Information
  primaryEmail: z.string().email('Invalid email address').optional().nullable(),

  // Organization Details
  missionStatement: z.string().optional().nullable(),
  visionStatement: z.string().optional().nullable(),
  foundedYear: z.number().int().min(1800).max(new Date().getFullYear()).optional().nullable(),

  // Localization
  timezone: z.string().default('UTC'),
  language: z.string().default('en-US'),
  currency: z.string().default('USD'),
  dateFormat: z.string().default('YYYY-MM-DD'),
  timeFormat: z.string().default('HH:mm'),

  // Status Flags
  isActive: z.boolean().default(true),
  isVerified: z.boolean().default(false),
  isPublic: z.boolean().default(true),

  // Relations
  statusId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  typeId: z.string().optional().nullable(),
  industryId: z.string().optional().nullable(),
  organizationSizeId: z.string().optional().nullable(),

  // Social Links
  socialLinks: z
    .array(
      z.object({
        id: z.string().optional(),
        platform: z.string(),
        url: z.string().url('Invalid URL'),
        title: z.string().optional(),
      }),
    )
    .optional(),

  // Addresses
  addresses: z
    .array(
      z.object({
        id: z.string().optional(),
        title: z.string().optional(),
        addressLine1: z.string().min(1, 'Address line 1 is required'),
        addressLine2: z.string().optional(),
        city: z.string().min(1, 'City is required'),
        state: z.string().optional(),
        postalCode: z.string().min(1, 'Postal code is required'),
        country: z.string().min(1, 'Country is required'),
        isPrimary: z.boolean().default(false),
        typeId: z.string().optional(),
      }),
    )
    .optional(),
})

export type OrganizationFormValues = z.infer<typeof organizationFormSchema>

// Mock function to fetch organization data
const fetchOrganization = async (id: string) => {
  // In a real app, this would be an API call
  return {
    id,
    slug: 'acme-corporation',
    image: '/placeholder.svg?height=100&width=100',
    title: 'Acme Corporation',
    description: 'A global leader in innovative solutions',
    coverImage: '/placeholder.svg?height=300&width=800',
    primaryEmail: 'contact@acmecorp.com',
    missionStatement: 'To provide cutting-edge solutions that empower businesses worldwide',
    visionStatement: 'To be the global leader in innovative technology solutions',
    foundedYear: 1985,
    timezone: 'America/New_York',
    language: 'en-US',
    currency: 'USD',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm',
    isActive: true,
    isVerified: true,
    isPublic: true,
    statusId: 'status-1',
    categoryId: 'category-2',
    typeId: 'type-1',
    industryId: 'industry-3',
    organizationSizeId: 'size-2',
    socialLinks: [
      {
        id: 'social-1',
        platform: 'Twitter',
        url: 'https://twitter.com/acmecorp',
        title: 'Acme Twitter',
      },
      {
        id: 'social-2',
        platform: 'LinkedIn',
        url: 'https://linkedin.com/company/acmecorp',
        title: 'Acme LinkedIn',
      },
    ],
    addresses: [
      {
        id: 'address-1',
        title: 'Headquarters',
        addressLine1: '123 Main Street',
        addressLine2: 'Suite 500',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA',
        isPrimary: true,
        typeId: 'type-1',
      },
    ],
  }
}

// Mock function to save organization data
const saveOrganization = async (data: OrganizationFormValues) => {
  // In a real app, this would be an API call
  debugLog('Saving organization:', data)
  return { success: true }
}

export function OrganizationForm({ id }: { id?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState('basic')

  // Initialize form with default values
  const form = useForm<OrganizationFormValues>({
    // resolver: zodResolver(organizationFormSchema),
    defaultValues: async () => {
      if (id) {
        setIsLoading(true)
        try {
          const data = await fetchOrganization(id)
          setIsLoading(false)
          return data
        } catch (error) {
          setIsLoading(false)

          return {
            slug: '',
            title: '',
            isActive: true,
            isVerified: false,
            isPublic: true,
            timezone: 'UTC',
            language: 'en-US',
            currency: 'USD',
            dateFormat: 'YYYY-MM-DD',
            timeFormat: 'HH:mm',
          }
        }
      }

      return {
        slug: '',
        title: '',
        isActive: true,
        isVerified: false,
        isPublic: true,
        timezone: 'UTC',
        language: 'en-US',
        currency: 'USD',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      }
    },
  })

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  // Handle title change to auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    form.setValue('title', title)

    // Only auto-generate slug if it's empty or matches the previous auto-generated slug
    const currentSlug = form.getValues('slug')
    const previousTitle = form.getValues('title')
    const previousAutoSlug = generateSlug(previousTitle)

    if (!currentSlug || currentSlug === previousAutoSlug) {
      form.setValue('slug', generateSlug(title))
    }
  }

  async function onSubmit(data: OrganizationFormValues) {
    setIsLoading(true)
    try {
      await saveOrganization(data)

      router.push('/organizations')
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <span className="ml-2 text-lg">{messages.ORGANIZATION.LOADING}</span>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-between space-x-4">
            <TabsList>
              <TabsTrigger value="basic">{messages.TABS.BASIC_INFO}</TabsTrigger>
              <TabsTrigger value="contact">{messages.TABS.CONTACT}</TabsTrigger>
              <TabsTrigger value="details">{messages.TABS.DETAILS}</TabsTrigger>
              <TabsTrigger value="localization">{messages.TABS.LOCALIZATION}</TabsTrigger>
              <TabsTrigger value="status">{messages.TABS.STATUS}</TabsTrigger>
              <TabsTrigger value="relations">{messages.TABS.RELATIONS}</TabsTrigger>
              <TabsTrigger value="links">{messages.TABS.LINKS}</TabsTrigger>
            </TabsList>
            <div className="flex flex-row gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/organizations')}
              >
                {messages.COMMON.CANCEL}
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {messages.BUTTONS.SAVE_ORGANIZATION}
              </Button>
            </div>
          </div>

          <TabsContent value="basic">
            <BasicInfoSection
              form={form}
              handleTitleChange={handleTitleChange}
            />
          </TabsContent>

          <TabsContent
            value="contact"
            className="mt-6"
          >
            <ContactInfoSection form={form} />
          </TabsContent>

          <TabsContent
            value="details"
            className="mt-6"
          >
            <DetailsSection form={form} />
          </TabsContent>

          <TabsContent
            value="localization"
            className="mt-6"
          >
            <LocalizationSection
              form={form}
              timezoneOptions={timezoneOptions}
              languageOptions={languageOptions}
              currencyOptions={currencyOptions}
              dateFormatOptions={dateFormatOptions}
              timeFormatOptions={timeFormatOptions}
            />
          </TabsContent>

          <TabsContent
            value="status"
            className="mt-6"
          >
            <StatusSection form={form} />
          </TabsContent>

          <TabsContent
            value="relations"
            className="mt-6"
          >
            <RelationsSection
              form={form}
              statusOptions={statusOptions}
              typeOptions={typeOptions}
              categoryOptions={categoryOptions}
              industryOptions={industryOptions}
              sizeOptions={sizeOptions}
            />
          </TabsContent>

          <TabsContent
            value="links"
            className="mt-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <SocialLinksSection form={form} />
              <AddressesSection
                form={form}
                typeOptions={typeOptions}
              />
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}
