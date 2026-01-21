import { Prisma } from '@prisma/client'
import { z } from 'zod'

// Base role type
const roleValidator = Prisma.validator<Prisma.RoleDefaultArgs>()({})
type Role = Prisma.RoleGetPayload<typeof roleValidator>

// Role with permissions type
const roleWithPermissionsSelect = Prisma.validator<Prisma.RoleDefaultArgs>()({
  include: { permissions: { include: { permission: true } } },
})
type RoleWithPermissions = Prisma.RoleGetPayload<typeof roleWithPermissionsSelect>

// Role filter type
const roleFilterSelect = Prisma.validator<Prisma.RoleDefaultArgs>()({
  select: {
    name: true,
    code: true,
    isSystem: true,
    isActive: true,
    isDefault: true,
    level: true,
  },
})
type RoleFilterType = Prisma.RoleGetPayload<typeof roleFilterSelect>

// Define missing input types derived from Zod schemas
const getRoleByIdInputValidator = Prisma.validator<Prisma.RoleDefaultArgs>()({
  select: { id: true },
})
type GetRoleByIdInput = Prisma.RoleGetPayload<typeof getRoleByIdInputValidator>

type CreateRoleInput = z.infer<typeof createRoleInputSchema>
type UpdateRoleInput = z.infer<typeof updateRoleInputSchema>

// Input/Output types
type GetRoleInput = {
  page?: number
  limit?: number
  search?: string
  filters?: RoleFilterType
}

type RoleWhereFilters = {
  total: number
  page: number
  limit: number
  items: RoleWithPermissions[]
} | null

type GetRoleOutput = {
  message: string
  success?: boolean
  data: RoleWhereFilters
}

type GetRoleByIdOutput = {
  message: string
  success?: boolean
  data: RoleWithPermissions | null
}

type CreateRoleOutput = {
  message: string
  success?: boolean
  data: RoleWithPermissions | null
}

type UpdateRoleOutput = {
  message: string
  success?: boolean
  data: RoleWithPermissions | null
}

type DeleteRoleOutput = {
  message: string
  success?: boolean
  data: { id: string } | null
}

// Zod schemas
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
}) satisfies z.ZodType<Role>

// Define the structure for the nested permission data *within* the RolePermission junction record
const nestedPermissionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  code: z.string(),
  category: z.string().nullable(),
  isActive: z.boolean(),
  isSystem: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
})

// Define the RolePermission junction record structure, matching Prisma's output
const rolePermissionJunctionSchema = z.object({
  // Fields from RolePermission model itself
  id: z.string(),
  roleId: z.string(),
  permissionId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  // The nested permission data included via Prisma
  permission: nestedPermissionSchema,
})

// Define RoleWithPermissions based on roleSchema and add the permissions array
const roleWithPermissionsSchema = roleSchema.extend({
  permissions: z.array(rolePermissionJunctionSchema),
}) satisfies z.ZodType<RoleWithPermissions>

const getRoleInputSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  filters: z
    .object({
      name: z.string().optional(),
      code: z.string().optional(),
      isSystem: z.boolean().optional(),
      isActive: z.boolean().optional(),
      isDefault: z.boolean().optional(),
      level: z.number().optional(),
    })
    .optional(),
})

const getRoleByIdInputSchema = z.object({
  id: z.string(),
})

const createRoleInputSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional().default(null),
  code: z.string().min(1),
  isSystem: z.boolean().default(false),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  level: z.number().default(0),
  permissions: z.array(z.string()).optional(),
})

const updateRoleInputSchema = z.object({
  id: z.string(),
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional().default(null),
  code: z.string().min(1).optional(),
  isSystem: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  level: z.number().optional(),
  permissions: z.array(z.string()).optional(),
})

const deleteRoleInputSchema = z.object({
  id: z.string(),
})

const roleFilterSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  items: z.array(roleWithPermissionsSchema),
}) satisfies z.ZodType<RoleWhereFilters>

const getRoleOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: roleFilterSchema.nullable(),
}) satisfies z.ZodType<GetRoleOutput>

const getRoleByIdOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: roleWithPermissionsSchema.nullable(),
}) satisfies z.ZodType<GetRoleByIdOutput>

const createRoleOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: roleWithPermissionsSchema.nullable(),
}) satisfies z.ZodType<CreateRoleOutput>

const updateRoleOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: roleWithPermissionsSchema.nullable(),
}) satisfies z.ZodType<UpdateRoleOutput>

const deleteRoleOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: z
    .object({
      id: z.string(),
    })
    .nullable(),
})

// Exports
export const roleValidators = {
  roleValidator,
  roleFilterSelect,
  roleWithPermissionsSelect,
}

export const roleValidations = {
  roleSchema,
  roleWithPermissionsSchema,
  getRoleInputSchema,
  getRoleOutputSchema,
  getRoleByIdInputSchema,
  getRoleByIdOutputSchema,
  createRoleInputSchema,
  createRoleOutputSchema,
  updateRoleInputSchema,
  updateRoleOutputSchema,
  deleteRoleInputSchema,
  deleteRoleOutputSchema,
  getRoleByIdInputValidator,
}

export interface RoleTypes {
  Role: Role
  RoleWithPermissions: RoleWithPermissions
  RoleFilterType: RoleFilterType
  RoleWhereFilters: RoleWhereFilters
  GetRoleInput: GetRoleInput
  GetRoleOutput: GetRoleOutput
  GetRoleByIdInput: GetRoleByIdInput
  GetRoleByIdOutput: GetRoleByIdOutput
  CreateRoleInput: CreateRoleInput
  CreateRoleOutput: CreateRoleOutput
  UpdateRoleInput: UpdateRoleInput
  UpdateRoleOutput: UpdateRoleOutput
  DeleteRoleOutput: DeleteRoleOutput
}
