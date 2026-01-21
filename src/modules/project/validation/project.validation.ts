import { Prisma } from '@prisma/client'
import { z } from 'zod'

// Base project type
const projectValidator = Prisma.validator<Prisma.ProjectDefaultArgs>()({})
type Project = Prisma.ProjectGetPayload<typeof projectValidator>

// Project with roles relation
const projectWithRolesSelect = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: {
    roles: {
      include: {
        permissions: true,
      },
    },
  },
})
type ProjectWithRoles = Prisma.ProjectGetPayload<typeof projectWithRolesSelect>

// Project filter fields
const projectFilterSelect = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  select: {
    name: true,
    slug: true,
    code: true,
    priority: true,
    organizationId: true,
    statusId: true,
    typeId: true,
    categoryId: true,
  },
})
type ProjectFilterType = Prisma.ProjectGetPayload<typeof projectFilterSelect>

// Input types
const getProjectByIdInputValidator = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  select: {
    id: true,
  },
})
type GetProjectByIdInput = Prisma.ProjectGetPayload<typeof getProjectByIdInputValidator>

const createProjectInputValidator = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  select: {
    name: true,
    description: true,
    slug: true,
    metadata: true,
    priority: true,
    featureFlags: true,
    code: true,
    color: true,
    icon: true,
    isActive: true,
    isPrivate: true,
    organizationId: true,
    statusId: true,
    typeId: true,
    categoryId: true,
    createdBy: true,
  },
})
type CreateProjectInput = Prisma.ProjectGetPayload<typeof createProjectInputValidator>

const updateProjectInputValidator = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  select: {
    id: true,
    name: true,
    description: true,
    slug: true,
    metadata: true,
    priority: true,
    featureFlags: true,
    code: true,
    color: true,
    icon: true,
    isActive: true,
    isPrivate: true,
    isArchived: true,
    organizationId: true,
    statusId: true,
    typeId: true,
    categoryId: true,
    updatedBy: true,
  },
})
type UpdateProjectInput = Prisma.ProjectGetPayload<typeof updateProjectInputValidator>

// Query types
type GetProjectInput = {
  page?: number
  limit?: number
  search?: string
  filters?: ProjectFilterType
}

type ProjectWhereFilters = {
  total: number
  page: number
  limit: number
  items: ProjectWithRoles[]
} | null

// Response types
type GetProjectOutput = {
  message: string
  success?: boolean
  data: ProjectWhereFilters
}

type GetProjectByIdOutput = {
  message: string
  success?: boolean
  data: ProjectWithRoles | null
}

type CreateProjectOutput = {
  message: string
  success?: boolean
  data: ProjectWithRoles | null
}

type UpdateProjectOutput = {
  message: string
  success?: boolean
  data: ProjectWithRoles | null
}

type DeleteProjectOutput = {
  message: string
  success?: boolean
  data: { id: string } | null
}

// Zod schemas
const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  slug: z.string(),
  metadata: z.record(z.any()),
  priority: z.number(),
  featureFlags: z.record(z.any()),
  code: z.string(),
  color: z.string(),
  icon: z.string(),
  isActive: z.boolean(),
  isPrivate: z.boolean(),
  isArchived: z.boolean(),
  organizationId: z.string(),
  statusId: z.string(),
  typeId: z.string(),
  categoryId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  createdBy: z.string(),
  updatedBy: z.string(),
}) satisfies z.ZodType<Project>

const projectWithRolesSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  slug: z.string(),
  metadata: z.record(z.any()),
  priority: z.number(),
  featureFlags: z.record(z.any()),
  code: z.string(),
  color: z.string(),
  icon: z.string(),
  isActive: z.boolean(),
  isPrivate: z.boolean(),
  isArchived: z.boolean(),
  organizationId: z.string(),
  statusId: z.string().nullable(),
  typeId: z.string().nullable(),
  categoryId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  createdBy: z.string().nullable(),
  updatedBy: z.string().nullable(),
  roles: z.array(
    z.object({
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
      permissions: z.array(
        z.object({
          id: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
          roleId: z.string(),
          permissionId: z.string(),
        }),
      ),
    }),
  ),
}) satisfies z.ZodType<ProjectWithRoles>

// Input schemas
const getProjectInputSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  filters: z
    .object({
      name: z.string().optional(),
      slug: z.string().optional(),
      code: z.string().optional(),
      priority: z.number().optional(),
      organizationId: z.string().optional(),
      statusId: z.string().nullable().optional(),
      typeId: z.string().nullable().optional(),
      categoryId: z.string().nullable().optional(),
    })
    .optional(),
})

const getProjectByIdInputSchema = z.object({
  id: z.string(),
}) satisfies z.ZodType<GetProjectByIdInput>

const createProjectInputSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional().default(null),
  slug: z.string().min(1),
  metadata: z.any().nullable().optional().default(null),
  priority: z.number().default(0),
  featureFlags: z.any().nullable().optional().default(null),
  code: z.string().min(1),
  color: z.string().nullable().optional().default(null),
  icon: z.string().nullable().optional().default(null),
  isActive: z.boolean().default(true),
  isPrivate: z.boolean().default(false),
  organizationId: z.string(),
  statusId: z.string().nullable().optional().default(null),
  typeId: z.string().nullable().optional().default(null),
  categoryId: z.string().nullable().optional().default(null),
  createdBy: z.string().nullable().optional().default(null),
})

const updateProjectInputSchema = z.object({
  id: z.string(),
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional().default(null),
  slug: z.string().min(1).optional(),
  metadata: z.any().nullable().optional().default(null),
  priority: z.number().optional(),
  featureFlags: z.any().nullable().optional().default(null),
  code: z.string().min(1).optional(),
  color: z.string().nullable().optional().default(null),
  icon: z.string().nullable().optional().default(null),
  isActive: z.boolean().optional(),
  isPrivate: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  organizationId: z.string().optional(),
  statusId: z.string().nullable().optional().default(null),
  typeId: z.string().nullable().optional().default(null),
  categoryId: z.string().nullable().optional().default(null),
  updatedBy: z.string().nullable().optional().default(null),
})

const deleteProjectInputSchema = z.object({
  id: z.string(),
})

// Output schemas
const projectFilterSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  items: z.array(projectWithRolesSchema),
}) satisfies z.ZodType<ProjectWhereFilters>

const getProjectOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: projectFilterSchema.nullable(),
}) satisfies z.ZodType<GetProjectOutput>

const getProjectByIdOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: projectWithRolesSchema.nullable(),
}) satisfies z.ZodType<GetProjectByIdOutput>

const createProjectOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: projectWithRolesSchema.nullable(),
}) satisfies z.ZodType<CreateProjectOutput>

const updateProjectOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: projectWithRolesSchema.nullable(),
}) satisfies z.ZodType<UpdateProjectOutput>

const deleteProjectOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: z
    .object({
      id: z.string(),
    })
    .nullable(),
}) satisfies z.ZodType<DeleteProjectOutput>

export const projectValidators = {
  projectValidator,
  projectFilterSelect,
  projectWithRolesSelect,
  updateProjectInputValidator,
  createProjectInputValidator,
  getProjectByIdInputValidator,
}

export const projectValidations = {
  projectSchema,
  projectWithRolesSchema,
  getProjectInputSchema,
  getProjectOutputSchema,
  getProjectByIdInputSchema,
  getProjectByIdOutputSchema,
  createProjectInputSchema,
  createProjectOutputSchema,
  updateProjectInputSchema,
  updateProjectOutputSchema,
  deleteProjectInputSchema,
  deleteProjectOutputSchema,
}

export interface ProjectTypes {
  Project: Project
  ProjectWithRoles: ProjectWithRoles
  ProjectFilterType: ProjectFilterType
  ProjectWhereFilters: ProjectWhereFilters
  GetProjectInput: GetProjectInput
  GetProjectOutput: GetProjectOutput
  GetProjectByIdInput: GetProjectByIdInput
  GetProjectByIdOutput: GetProjectByIdOutput
  CreateProjectInput: CreateProjectInput
  CreateProjectOutput: CreateProjectOutput
  UpdateProjectInput: UpdateProjectInput
  UpdateProjectOutput: UpdateProjectOutput
  DeleteProjectOutput: DeleteProjectOutput
}
