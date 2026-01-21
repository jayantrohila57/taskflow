import { Prisma } from '@prisma/client'
import { z } from 'zod'

// Base Team type
const teamValidator = Prisma.validator<Prisma.TeamDefaultArgs>()({})
type Team = Prisma.TeamGetPayload<typeof teamValidator>

// Team with Roles type
const teamWithRolesSelect = Prisma.validator<Prisma.TeamDefaultArgs>()({
  include: { roles: true }, // Include roles directly related to Team
})
type TeamWithRoles = Prisma.TeamGetPayload<typeof teamWithRolesSelect>

// Team filter type
const teamFilterSelect = Prisma.validator<Prisma.TeamDefaultArgs>()({
  select: {
    name: true,
    slug: true,
    organizationId: true,
    visibility: true,
    isActive: true,
    isPrivate: true,
    isDefault: true,
  },
})
type TeamFilterType = Prisma.TeamGetPayload<typeof teamFilterSelect>

// Input/Output Types for API operations
const getTeamByIdInputValidator = Prisma.validator<Prisma.TeamDefaultArgs>()({
  select: { id: true },
})
type GetTeamByIdInput = Prisma.TeamGetPayload<typeof getTeamByIdInputValidator>

// Input type for CreateTeam (using Zod inference)
type CreateTeamInput = z.infer<typeof createTeamInputSchema>

// Input type for UpdateTeam (using Zod inference)
type UpdateTeamInput = z.infer<typeof updateTeamInputSchema>

type GetTeamInput = {
  page?: number
  limit?: number
  search?: string
  filters?: TeamFilterType
}

type TeamWhereFilters = {
  total: number
  page: number
  limit: number
  items: TeamWithRoles[]
} | null

type GetTeamOutput = {
  message: string
  success?: boolean
  data: TeamWhereFilters
}

type GetTeamByIdOutput = {
  message: string
  success?: boolean
  data: TeamWithRoles | null
}

type CreateTeamOutput = {
  message: string
  success?: boolean
  data: TeamWithRoles | null
}

type UpdateTeamOutput = {
  message: string
  success?: boolean
  data: TeamWithRoles | null
}

type DeleteTeamOutput = {
  message: string
  success?: boolean
  data: { id: string } | null
}

// Zod Schemas
const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  code: z.string(),
  isSystem: z.boolean(),
  isActive: z.boolean(),
  isDefault: z.boolean(),
  level: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
})

const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  slug: z.string(),
  color: z.string().nullable(),
  logo: z.string().nullable(),
  metadata: z.record(z.any()).nullable(), // Changed to record to better match Prisma Json type
  visibility: z.string(),
  isDiscoverable: z.boolean(),
  isArchived: z.boolean(),
  isActive: z.boolean(),
  isPrivate: z.boolean(),
  isDefault: z.boolean(),
  organizationId: z.string(),
  statusId: z.string().nullable(),
  typeId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
}) satisfies z.ZodType<Team>

const teamWithRolesSchema = teamSchema.extend({
  roles: z.array(roleSchema), // Roles directly linked to Team
}) satisfies z.ZodType<TeamWithRoles>

const getTeamInputSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  filters: z
    .object({
      name: z.string().optional(),
      slug: z.string().optional(),
      organizationId: z.string().optional(),
      visibility: z.string().optional(),
      isActive: z.boolean().optional(),
      isPrivate: z.boolean().optional(),
      isDefault: z.boolean().optional(),
    })
    .optional(),
})

const getTeamByIdInputSchema = z.object({
  id: z.string(),
})

const createTeamInputSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  organizationId: z.string(),
  description: z.string().nullable().optional().default(null),
  color: z.string().nullable().optional().default(null),
  logo: z.string().nullable().optional().default(null),
  metadata: z.any().nullable().optional().default(null),
  visibility: z.string().default('organization'),
  isDiscoverable: z.boolean().default(true),
  isActive: z.boolean().default(true),
  isPrivate: z.boolean().default(false),
  isDefault: z.boolean().default(false),
  statusId: z.string().nullable().optional().default(null),
  typeId: z.string().nullable().optional().default(null),
  // Roles are managed via TeamRole, not directly on team creation/update in this schema
  // Add roleIds field if you want to manage roles during creation
  // roleIds: z.array(z.string()).optional(),
})

const updateTeamInputSchema = z.object({
  id: z.string(),
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  organizationId: z.string().optional(), // Usually shouldn't change, but allowed
  description: z.string().nullable().optional().default(null),
  color: z.string().nullable().optional().default(null),
  logo: z.string().nullable().optional().default(null),
  metadata: z.any().nullable().optional().default(null),
  visibility: z.string().optional(),
  isDiscoverable: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isPrivate: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  statusId: z.string().nullable().optional().default(null),
  typeId: z.string().nullable().optional().default(null),
  // Add roleIds field if you want to manage roles during update
  // roleIds: z.array(z.string()).optional(),
})

const deleteTeamInputSchema = z.object({
  id: z.string(),
})

const teamFilterSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  items: z.array(teamWithRolesSchema),
}) satisfies z.ZodType<TeamWhereFilters>

const getTeamOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: teamFilterSchema.nullable(),
}) satisfies z.ZodType<GetTeamOutput>

const getTeamByIdOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: teamWithRolesSchema.nullable(),
}) satisfies z.ZodType<GetTeamByIdOutput>

const createTeamOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: teamWithRolesSchema.nullable(),
}) satisfies z.ZodType<CreateTeamOutput>

const updateTeamOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: teamWithRolesSchema.nullable(),
}) satisfies z.ZodType<UpdateTeamOutput>

const deleteTeamOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: z.object({ id: z.string() }).nullable(),
})

// Exports
export const teamValidators = {
  teamValidator,
  teamFilterSelect,
  teamWithRolesSelect,
  getTeamByIdInputValidator,
}

export const teamValidations = {
  teamSchema,
  teamWithRolesSchema,
  getTeamInputSchema,
  getTeamOutputSchema,
  getTeamByIdInputSchema,
  getTeamByIdOutputSchema,
  createTeamInputSchema,
  createTeamOutputSchema,
  updateTeamInputSchema,
  updateTeamOutputSchema,
  deleteTeamInputSchema,
  deleteTeamOutputSchema,
}

export interface TeamTypes {
  Team: Team
  TeamWithRoles: TeamWithRoles
  TeamFilterType: TeamFilterType
  TeamWhereFilters: TeamWhereFilters
  GetTeamInput: GetTeamInput
  GetTeamOutput: GetTeamOutput
  GetTeamByIdInput: GetTeamByIdInput
  GetTeamByIdOutput: GetTeamByIdOutput
  CreateTeamInput: CreateTeamInput
  CreateTeamOutput: CreateTeamOutput
  UpdateTeamInput: UpdateTeamInput
  UpdateTeamOutput: UpdateTeamOutput
  DeleteTeamOutput: DeleteTeamOutput
}
