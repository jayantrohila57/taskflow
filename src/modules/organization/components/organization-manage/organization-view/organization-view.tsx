import {
  Building2,
  Calendar,
  Check,
  Clock,
  Coins,
  Globe,
  Languages,
  Link,
  Mail,
  MapPin,
  Users,
  Briefcase,
  Tags,
  Info,
  Share2,
  X,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { messages } from '@/lib/messages'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
import { Separator } from '@/components/ui/separator'
import type { Organization } from '@prisma/client'

interface SelectOption {
  value: string
  label: string
  symbol?: string
  example?: string
}

interface SocialLink {
  id: string
  platform: string
  url: string
}

interface Address {
  id: string
  title?: string
  isPrimary: boolean
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

// Extend the Organization type to include socialLinks and addresses if they are not
// directly part of the base Prisma Organization type in your schema.
// Adjust this type based on how your Prisma schema is defined and how these relations
// are included in the data fetched for the organization.
interface OrganizationWithRelations extends Organization {
  socialLinks?: SocialLink[] // Assuming socialLinks is a relation or a JSON field
  addresses?: Address[] // Assuming addresses is a relation or a JSON field
}

export function OrganizationView({ organization }: { organization: OrganizationWithRelations }) {
  // Helper function to find option labels
  const getOptionLabel = (options: SelectOption[], value: string | null | undefined) => {
    if (!value) return 'N/A' // Handle null or undefined values
    return options.find((option) => option.value === value)?.label || value
  }

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card>
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 3}>
            <Image
              src={organization.coverImage || '/placeholder.svg'}
              alt={`${organization.title} cover`}
              fill
              className="object-cover"
              priority
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="relative -mt-16 flex items-end gap-4 p-4">
          <Avatar className="border-background h-20 w-20 border-4">
            <AvatarImage
              className="rounded-xl"
              src={organization.image || '/placeholder.svg?height=80&width=80'}
              alt={organization.title}
            />
            <AvatarFallback>{organization.title.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{organization.title}</h2>
            <p className="text-muted-foreground">{organization.slug}</p>
          </div>
        </CardContent>
      </Card>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5" /> {' Status Information'}
            </div>
          </CardTitle>
          <CardDescription>{'Organization status and visibility details'}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={organization.isActive ? 'default' : 'outline'}
              className="flex items-center gap-1"
            >
              {organization.isActive ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              {organization.isActive ? messages.VIEW.ACTIVE : messages.VIEW.INACTIVE}
            </Badge>

            {organization.isVerified && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1"
              >
                <Check className="h-3 w-3" />
                {messages.VIEW.VERIFIED}
              </Badge>
            )}

            <Badge
              variant={organization.isPublic ? 'default' : 'outline'}
              className="flex items-center gap-1"
            >
              {organization.isPublic ? messages.VIEW.PUBLIC : messages.VIEW.PRIVATE}
            </Badge>

            {organization.statusId && (
              <Badge className="flex items-center gap-1">{getOptionLabel(statusOptions, organization.statusId)}</Badge>
            )}
          </div>

          <div className="mt-4">
            <h3 className="mb-2 font-medium">{'Description'}</h3>
            <p className="text-muted-foreground">{organization.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Grid Layout for Information Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Basic Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                {messages.VIEW.DETAILS}
              </div>
            </CardTitle>
            <CardDescription>{'Basic organization information'}</CardDescription>
          </CardHeader>
          <Separator />

          <CardContent className="space-y-4">
            {organization.foundedYear && (
              <div className="flex items-start gap-2">
                <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
                <div>
                  <p className="font-medium">{messages.VIEW.FOUNDED}</p>
                  <p className="text-muted-foreground">{organization.foundedYear}</p>
                </div>
              </div>
            )}

            {organization.missionStatement && (
              <div>
                <p className="mb-1 font-medium">{messages.VIEW.MISSION}</p>
                <p className="text-muted-foreground">{organization.missionStatement}</p>
              </div>
            )}

            {organization.visionStatement && (
              <div>
                <p className="mb-1 font-medium">{messages.VIEW.VISION}</p>
                <p className="text-muted-foreground">{organization.visionStatement}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                {messages.VIEW.CONTACT_INFO}
              </div>
            </CardTitle>
            <CardDescription>{'Ways to contact the organization'}</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-4">
            {organization.primaryEmail && (
              <div className="flex items-start gap-2">
                <Mail className="text-muted-foreground mt-0.5 h-5 w-5" />
                <div>
                  <p className="font-medium">{messages.VIEW.PRIMARY_EMAIL}</p>
                  <a
                    href={`mailto:${organization.primaryEmail}`}
                    className="text-primary hover:underline"
                  >
                    {organization.primaryEmail}
                  </a>
                </div>
              </div>
            )}
            {/* Add other contact info fields here if available on Organization type */}
            {/* Example: organization.phoneNumber */}
          </CardContent>
        </Card>

        {/* Localization */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {messages.VIEW.LOCALIZATION}
              </div>
            </CardTitle>
            <CardDescription>{'Regional and formatting preferences'}</CardDescription>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-4">
            <div className="flex items-start gap-2">
              <Globe className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div>
                <p className="font-medium">{messages.VIEW.TIMEZONE}</p>
                <p className="text-muted-foreground">{getOptionLabel(timezoneOptions, organization.timezone)}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Languages className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div>
                <p className="font-medium">{messages.VIEW.LANGUAGE}</p>
                <p className="text-muted-foreground">{getOptionLabel(languageOptions, organization.language)}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Coins className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div>
                <p className="font-medium">{messages.VIEW.CURRENCY}</p>
                <p className="text-muted-foreground">
                  {getOptionLabel(currencyOptions, organization.currency)}{' '}
                  <span className="bg-muted rounded px-1 py-0.5 text-xs">
                    {currencyOptions.find((c) => c.value === organization.currency)?.symbol}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div>
                <p className="font-medium">{messages.VIEW.DATE_FORMAT}</p>
                <p className="text-muted-foreground">
                  {getOptionLabel(dateFormatOptions, organization.dateFormat)}{' '}
                  <span className="text-muted-foreground text-xs">
                    {dateFormatOptions?.find((f) => f.value === organization.dateFormat)?.example}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div>
                <p className="font-medium">{messages.VIEW.TIME_FORMAT}</p>
                <p className="text-muted-foreground">
                  {getOptionLabel(timeFormatOptions, organization.timeFormat)}{' '}
                  <span className="text-muted-foreground text-xs">
                    {timeFormatOptions.find((f) => f.value === organization.timeFormat)?.example}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Relations */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                {messages.VIEW.RELATIONS}
              </div>
            </CardTitle>
            <CardDescription>{'Organizational classifications and relationships'}</CardDescription>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-4">
            {organization.typeId && (
              <div className="flex items-start gap-2">
                <Briefcase className="text-muted-foreground mt-0.5 h-5 w-5" />
                <div>
                  <p className="font-medium">{messages.VIEW.TYPE}</p>
                  <p className="text-muted-foreground">{getOptionLabel(typeOptions, organization.typeId)}</p>
                </div>
              </div>
            )}

            {organization.categoryId && (
              <div className="flex items-start gap-2">
                <Tags className="text-muted-foreground mt-0.5 h-5 w-5" />
                <div>
                  <p className="font-medium">{messages.VIEW.CATEGORY}</p>
                  <p className="text-muted-foreground">{getOptionLabel(categoryOptions, organization.categoryId)}</p>
                </div>
              </div>
            )}

            {organization.industryId && (
              <div className="flex items-start gap-2">
                <Building2 className="text-muted-foreground mt-0.5 h-5 w-5" />
                <div>
                  <p className="font-medium">{messages.VIEW.INDUSTRY}</p>
                  <p className="text-muted-foreground">{getOptionLabel(industryOptions, organization.industryId)}</p>
                </div>
              </div>
            )}

            {organization.organizationSizeId && (
              <div className="flex items-start gap-2">
                <Users className="text-muted-foreground mt-0.5 h-5 w-5" />
                <div>
                  <p className="font-medium">{messages.VIEW.SIZE}</p>
                  <p className="text-muted-foreground">
                    {getOptionLabel(sizeOptions, organization.organizationSizeId)}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                {messages.VIEW.SOCIAL_LINKS}
              </div>
            </CardTitle>
            <CardDescription>{'Online presence and social media'}</CardDescription>
          </CardHeader>
          <Separator />

          <CardContent>
            {organization.socialLinks && organization.socialLinks.length > 0 ? (
              <div className="space-y-3">
                {organization.socialLinks.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center gap-2"
                  >
                    <Link className="text-muted-foreground h-5 w-5" />
                    <div>
                      <p className="font-medium">{link.platform}</p>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline"
                      >
                        {link.url}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center">{messages.FORM_SECTIONS.SOCIAL_LINKS.NO_LINKS}</p>
            )}
          </CardContent>
        </Card>

        {/* Addresses */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {messages.VIEW.ADDRESSES}
              </div>
            </CardTitle>
            <CardDescription>{'Physical locations and offices'}</CardDescription>
          </CardHeader>

          <Separator />

          <CardContent>
            {organization.addresses && organization.addresses.length > 0 ? (
              <div className="space-y-4">
                {organization.addresses.map((address) => (
                  <div
                    key={address.id}
                    className="rounded-md border p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="text-muted-foreground h-5 w-5" />
                        <p className="font-medium">{address.title || 'Address'}</p>
                      </div>
                      {address.isPrimary && <Badge variant="outline">{'Primary'}</Badge>}
                    </div>
                    <div className="text-muted-foreground space-y-1">
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>
                        {address.city}
                        {','} {address.state} {address.postalCode}
                      </p>
                      <p>{address.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center">{messages.FORM_SECTIONS.ADDRESSES.NO_ADDRESSES}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
