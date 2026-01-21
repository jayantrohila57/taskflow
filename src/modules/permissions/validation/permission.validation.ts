import { Prisma } from '@prisma/client'
import { z } from 'zod'

const permissionValidator = Prisma.validator<Prisma.PermissionDefaultArgs>()({})
type Permission = Prisma.PermissionGetPayload<typeof permissionValidator>

const permissionFilterSelect = Prisma.validator<Prisma.PermissionDefaultArgs>()({
  select: {
    name: true,
    code: true,
    category: true,
    isActive: true,
    isSystem: true,
  },
})
type PermissionFilterType = Prisma.PermissionGetPayload<typeof permissionFilterSelect>

const getPermissionByIdInputValidator = Prisma.validator<Prisma.PermissionDefaultArgs>()({
  select: {
    id: true,
  },
})
type GetPermissionByIdInput = Prisma.PermissionGetPayload<typeof getPermissionByIdInputValidator>

const createPermissionInputValidator = Prisma.validator<Prisma.PermissionDefaultArgs>()({
  select: {
    name: true,
    description: true,
    code: true,
    category: true,
    isActive: true,
    isSystem: true,
  },
})
type CreatePermissionInput = Prisma.PermissionGetPayload<typeof createPermissionInputValidator>

const updatePermissionInputValidator = Prisma.validator<Prisma.PermissionDefaultArgs>()({
  select: {
    id: true,
    name: true,
    description: true,
    code: true,
    category: true,
    isActive: true,
    isSystem: true,
  },
})
type UpdatePermissionInput = Prisma.PermissionGetPayload<typeof updatePermissionInputValidator>

type GetPermissionInput = {
  page?: number
  limit?: number
  search?: string
  filters?: PermissionFilterType
}

type PermissionWhereFilters = {
  total: number
  page: number
  limit: number
  items: Permission[]
} | null

type GetPermissionOutput = {
  message: string
  success?: boolean
  data: PermissionWhereFilters
}

type GetPermissionByIdOutput = {
  message: string
  success?: boolean
  data: Permission | null
}

type CreatePermissionOutput = {
  message: string
  success?: boolean
  data: Permission | null
}

type UpdatePermissionOutput = {
  message: string
  success?: boolean
  data: Permission | null
}

type DeletePermissionOutput = {
  message: string
  success?: boolean
  data: { id: string } | null
}

const permissionSchema = z.object({
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
}) satisfies z.ZodType<Permission>

const getPermissionInputSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  filters: z
    .object({
      name: z.string().optional(),
      code: z.string().optional(),
      category: z.string().nullable().optional(),
      isActive: z.boolean().optional(),
      isSystem: z.boolean().optional(),
    })
    .optional(),
}) // No satisfies

const getPermissionByIdInputSchema = z.object({
  id: z.string(),
}) satisfies z.ZodType<GetPermissionByIdInput>

const createPermissionInputSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional().default(null),
  code: z.string().min(1),
  category: z.string().nullable().optional().default(null),
  isActive: z.boolean().default(true),
  isSystem: z.boolean().default(false),
}) // No satisfies

const updatePermissionInputSchema = z.object({
  id: z.string(),
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional().default(null),
  code: z.string().min(1).optional(),
  category: z.string().nullable().optional().default(null),
  isActive: z.boolean().optional(),
  isSystem: z.boolean().optional(),
}) // No satisfies

const deletePermissionInputSchema = z.object({
  id: z.string(),
})

const permissionFilterSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  items: z.array(permissionSchema),
}) satisfies z.ZodType<PermissionWhereFilters>

const getPermissionOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: permissionFilterSchema.nullable(),
}) satisfies z.ZodType<GetPermissionOutput>

const getPermissionByIdOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: permissionSchema.nullable(),
}) satisfies z.ZodType<GetPermissionByIdOutput>

const createPermissionOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: permissionSchema.nullable(),
}) satisfies z.ZodType<CreatePermissionOutput>

const updatePermissionOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: permissionSchema.nullable(),
}) satisfies z.ZodType<UpdatePermissionOutput>

const deletePermissionOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: z
    .object({
      id: z.string(),
    })
    .nullable(),
}) satisfies z.ZodType<DeletePermissionOutput>

export const permissionValidators = {
  permissionValidator,
  permissionFilterSelect,
  updatePermissionInputValidator,
  createPermissionInputValidator,
  getPermissionByIdInputValidator,
}

export const permissionValidations = {
  permissionSchema,
  getPermissionInputSchema,
  getPermissionOutputSchema,
  getPermissionByIdInputSchema,
  getPermissionByIdOutputSchema,
  createPermissionInputSchema,
  createPermissionOutputSchema,
  updatePermissionInputSchema,
  updatePermissionOutputSchema,
  deletePermissionInputSchema,
  deletePermissionOutputSchema,
}

export interface PermissionTypes {
  Permission: Permission
  PermissionFilterType: PermissionFilterType
  PermissionWhereFilters: PermissionWhereFilters
  GetPermissionInput: GetPermissionInput
  GetPermissionOutput: GetPermissionOutput
  GetPermissionByIdInput: GetPermissionByIdInput
  GetPermissionByIdOutput: GetPermissionByIdOutput
  CreatePermissionInput: CreatePermissionInput
  CreatePermissionOutput: CreatePermissionOutput
  UpdatePermissionInput: UpdatePermissionInput
  UpdatePermissionOutput: UpdatePermissionOutput
  DeletePermissionOutput: DeletePermissionOutput
}
