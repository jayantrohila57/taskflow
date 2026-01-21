import { Prisma } from '@prisma/client'
import { z } from 'zod'

const organizationValidator = Prisma.validator<Prisma.OrganizationDefaultArgs>()({})
type Organization = Prisma.OrganizationGetPayload<typeof organizationValidator>

const organizationSelect = Prisma.validator<Prisma.OrganizationDefaultArgs>()({
  select: {
    id: true,
    slug: true,
    image: true,
    title: true,
    description: true,
    coverImage: true,
    primaryEmail: true,
    missionStatement: true,
    visionStatement: true,
    foundedYear: true,
    timezone: true,
    language: true,
    currency: true,
    dateFormat: true,
    timeFormat: true,
    isActive: true,
    isVerified: true,
    isPublic: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    statusId: true,
    categoryId: true,
    typeId: true,
    industryId: true,
    organizationSizeId: true,
    createdByUserId: true,
  },
})
type OrganizationSelect = {
  id: string
  slug: string
  image: string | null
  title: string
  description: string | null
  coverImage: string | null
  primaryEmail: string | null
  missionStatement: string | null
  visionStatement: string | null
  foundedYear: number | null
  timezone: string | null
  language: string | null
  currency: string | null
  dateFormat: string | null
  timeFormat: string | null
  isActive: boolean
  isVerified: boolean
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  statusId: string | null
  categoryId: string | null
  typeId: string | null
  industryId: string | null
  organizationSizeId: string | null
  createdByUserId: string | null
}

const getOrganizationByIdInputValidator = Prisma.validator<Prisma.OrganizationDefaultArgs>()({
  select: {
    id: true,
  },
})
type GetOrganizationByIdInput = Prisma.OrganizationGetPayload<typeof getOrganizationByIdInputValidator>

const createOrganizationInputValidator = Prisma.validator<Prisma.OrganizationDefaultArgs>()({
  select: {
    slug: true,
    image: true,
    title: true,
    description: true,
    coverImage: true,
    primaryEmail: true,
    missionStatement: true,
    visionStatement: true,
    foundedYear: true,
    timezone: true,
    language: true,
    currency: true,
    dateFormat: true,
    timeFormat: true,
    isActive: true,
    isVerified: true,
    isPublic: true,
    statusId: true,
    categoryId: true,
    typeId: true,
    industryId: true,
    organizationSizeId: true,
    createdByUserId: true,
  },
})
type CreateOrganizationInput = Prisma.OrganizationGetPayload<typeof createOrganizationInputValidator>

const updateOrganizationInputValidator = Prisma.validator<Prisma.OrganizationDefaultArgs>()({
  select: {
    id: true,
    slug: true,
    image: true,
    title: true,
    description: true,
    coverImage: true,
    primaryEmail: true,
    missionStatement: true,
    visionStatement: true,
    foundedYear: true,
    timezone: true,
    language: true,
    currency: true,
    dateFormat: true,
    timeFormat: true,
    isActive: true,
    isVerified: true,
    isPublic: true,
    statusId: true,
    categoryId: true,
    typeId: true,
    industryId: true,
    organizationSizeId: true,
    createdByUserId: true,
  },
})
type UpdateOrganizationInput = Prisma.OrganizationGetPayload<typeof updateOrganizationInputValidator>

const deleteOrganizationInputValidator = Prisma.validator<Prisma.OrganizationDefaultArgs>()({
  select: {
    id: true,
  },
})
type DeleteOrganizationInput = Prisma.OrganizationGetPayload<typeof deleteOrganizationInputValidator>

type GetOrganizationInput = {
  page?: number
  limit?: number
  search?: string
}

type OrganizationWhereFilters = {
  total: number
  page: number
  limit: number
  organizations: OrganizationSelect[]
} | null

type GetOrganizationOutput = {
  message: string
  success?: boolean
  data: OrganizationWhereFilters
}

type GetOrganizationByIdOutput = {
  message: string
  success?: boolean
  data: OrganizationSelect | null
}

type CreateOrganizationOutput = {
  message: string
  success?: boolean
  data: OrganizationSelect | null
}

type UpdateOrganizationOutput = {
  message: string
  success?: boolean
  data: OrganizationSelect | null
}

type DeleteOrganizationOutput = {
  message: string
  success?: boolean
  data: OrganizationSelect | null
}

const organizationSchema = z.object({
  id: z.string(),
  slug: z.string(),
  image: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  coverImage: z.string().nullable(),
  primaryEmail: z.string().nullable(),
  missionStatement: z.string().nullable(),
  visionStatement: z.string().nullable(),
  foundedYear: z.number().nullable(),
  timezone: z.string().nullable().default('UTC'),
  language: z.string().nullable().default('en-US'),
  currency: z.string().nullable().default('USD'),
  dateFormat: z.string().nullable().default('YYYY-MM-DD'),
  timeFormat: z.string().nullable().default('HH:mm'),
  isActive: z.boolean().default(true),
  isVerified: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  statusId: z.string().nullable(),
  categoryId: z.string().nullable(),
  typeId: z.string().nullable(),
  industryId: z.string().nullable(),
  organizationSizeId: z.string().nullable(),
  createdByUserId: z.string().nullable(),
})

const getOrganizationInputSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
})

const getOrganizationByIdInputSchema = z.object({
  id: z.string(),
})

const createOrganizationInputSchema = z.object({
  slug: z.string(),
  image: z.string().nullable().default(null),
  title: z.string(),
  description: z.string().nullable().default(null),
  coverImage: z.string().nullable().default(null),
  primaryEmail: z.string().nullable().default(null),
  missionStatement: z.string().nullable().default(null),
  visionStatement: z.string().nullable().default(null),
  foundedYear: z.number().nullable().default(null),
  timezone: z.string().nullable().default('UTC'),
  language: z.string().nullable().default('en-US'),
  currency: z.string().nullable().default('USD'),
  dateFormat: z.string().nullable().default('YYYY-MM-DD'),
  timeFormat: z.string().nullable().default('HH:mm'),
  isActive: z.boolean().default(true),
  isVerified: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  statusId: z.string().nullable().default(null),
  categoryId: z.string().nullable().default(null),
  typeId: z.string().nullable().default(null),
  industryId: z.string().nullable().default(null),
  organizationSizeId: z.string().nullable().default(null),
  createdByUserId: z.string().nullable().default(null),
})

const updateOrganizationInputSchema = z.object({
  id: z.string(),
  slug: z.string().optional(),
  image: z.string().nullable().optional(),
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  coverImage: z.string().nullable().optional(),
  primaryEmail: z.string().nullable().optional(),
  missionStatement: z.string().nullable().optional(),
  visionStatement: z.string().nullable().optional(),
  foundedYear: z.number().nullable().optional(),
  timezone: z.string().nullable().optional(),
  language: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  dateFormat: z.string().nullable().optional(),
  timeFormat: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  statusId: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),
  typeId: z.string().nullable().optional(),
  industryId: z.string().nullable().optional(),
  organizationSizeId: z.string().nullable().optional(),
  createdByUserId: z.string().nullable().optional(),
})

const deleteOrganizationInputSchema = z.object({
  id: z.string(),
})

const organizationFilterSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  organizations: z.array(organizationSchema),
})

const getOrganizationOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: organizationFilterSchema.nullable(),
})

const getOrganizationByIdOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: organizationSchema.nullable(),
})

const createOrganizationOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: organizationSchema.nullable(),
})

const updateOrganizationOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: organizationSchema.nullable(),
})

const deleteOrganizationOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: organizationSchema.nullable(),
})

export const organizationValidators = {
  organizationValidator,
  organizationSelect,
  getOrganizationByIdInputValidator,
  createOrganizationInputValidator,
  updateOrganizationInputValidator,
  deleteOrganizationInputValidator,
}

export const organizations = {
  getOrganizationInputSchema,
  getOrganizationOutputSchema,
  getOrganizationByIdInputSchema,
  getOrganizationByIdOutputSchema,
  createOrganizationInputSchema,
  createOrganizationOutputSchema,
  updateOrganizationInputSchema,
  updateOrganizationOutputSchema,
  deleteOrganizationInputSchema,
  deleteOrganizationOutputSchema,
}

export interface OrganizationTypes {
  Organization: Organization
  OrganizationSelect: OrganizationSelect
  OrganizationWhereFilters: OrganizationWhereFilters
  GetOrganizationInput: GetOrganizationInput
  GetOrganizationOutput: GetOrganizationOutput
  GetOrganizationByIdInput: GetOrganizationByIdInput
  GetOrganizationByIdOutput: GetOrganizationByIdOutput
  CreateOrganizationInput: CreateOrganizationInput
  CreateOrganizationOutput: CreateOrganizationOutput
  UpdateOrganizationInput: UpdateOrganizationInput
  UpdateOrganizationOutput: UpdateOrganizationOutput
  DeleteOrganizationInput: DeleteOrganizationInput
  DeleteOrganizationOutput: DeleteOrganizationOutput
}
