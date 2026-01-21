import { Prisma } from '@prisma/client'
import { z } from 'zod'

const userValidator = Prisma.validator<Prisma.UserDefaultArgs>()({})
type User = Prisma.UserGetPayload<typeof userValidator>

const userWithRoleSelect = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { roles: true },
})
type UserWithRole = Prisma.UserGetPayload<typeof userWithRoleSelect>

const userFilterSelect = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    name: true,
    email: true,
  },
})
type UserFilterType = Prisma.UserGetPayload<typeof userFilterSelect>

const getUserByIdInputValidator = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
  },
})
type GetUserByIdInput = Prisma.UserGetPayload<typeof getUserByIdInputValidator>

const updateUserInputValidator = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    name: true,
    email: true,
  },
})
type UpdateUserInput = Prisma.UserGetPayload<typeof updateUserInputValidator>

// Define type directly from Prisma to avoid linter issues
type UserWithFullDetails = Prisma.UserGetPayload<{
  include: {
    roles: true
    accounts: true
    sessions: true
    UserRole: {
      include: {
        role: true
      }
    }
  }
}> & {
  organizationLength: number | null
}

type GetUserInput = {
  page?: number
  limit?: number
  search?: string
  filters?: UserFilterType
}

type UserWhereFilters = {
  total: number
  page: number
  limit: number
  items: UserWithRole[]
} | null

type GetUserOutput = {
  message: string
  success?: boolean
  data: UserWhereFilters
}

type GetUserByIdOutput = {
  message: string
  success?: boolean
  data: UserWithRole | null
}

type UpdateUserOutput = {
  message: string
  success?: boolean
  data: UserWithRole | null
}

type GetFullUserDetailsByIdOutput = {
  message: string
  success?: boolean
  data: UserWithFullDetails | null
}

const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  image: z.string().nullable(),
  displayName: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.date().nullable(),
  profileImage: z.string().nullable(),
  hashedPassword: z.string().nullable(),
  twoFactorEnabled: z.boolean(),
  twoFactorSecret: z.string().nullable(),
  twoFactorBackupCodes: z.string().nullable(),
  failedLoginAttempts: z.number(),
  lockedUntil: z.date().nullable(),
  lastLoginAt: z.date().nullable(),
  lastPasswordChangeAt: z.date().nullable(),
  preferredLanguage: z.string().nullable(),
  preferredTheme: z.string().nullable(),
  timezone: z.string().nullable(),
  statusId: z.string().nullable(),
  isSystem: z.boolean(),
  isArchived: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
}) satisfies z.ZodType<User>

const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  isSystem: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  code: z.string(),
  description: z.string().nullable(),
  isActive: z.boolean(),
  isDefault: z.boolean(),
  level: z.number(),
})

const userWithRoleSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  image: z.string().nullable(),
  displayName: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.date().nullable(),
  profileImage: z.string().nullable(),
  hashedPassword: z.string().nullable(),
  twoFactorEnabled: z.boolean(),
  twoFactorSecret: z.string().nullable(),
  twoFactorBackupCodes: z.string().nullable(),
  failedLoginAttempts: z.number(),
  lockedUntil: z.date().nullable(),
  lastLoginAt: z.date().nullable(),
  lastPasswordChangeAt: z.date().nullable(),
  preferredLanguage: z.string().nullable(),
  preferredTheme: z.string().nullable(),
  timezone: z.string().nullable(),
  statusId: z.string().nullable(),
  isSystem: z.boolean(),
  isArchived: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  roles: z.array(roleSchema),
  organizationLength: z.number().nullable(),
}) satisfies z.ZodType<UserWithRole>

const getUserInputSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  filters: z
    .object({
      name: z.string().nullable(),
      email: z.string().nullable(),
    })
    .optional(),
}) satisfies z.ZodType<GetUserInput>

const getUserByIdInputSchema = z.object({
  id: z.string(),
}) satisfies z.ZodType<GetUserByIdInput>

const updateUserInputSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
}) satisfies z.ZodType<UpdateUserInput>

const userFilterSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  items: z.array(userWithRoleSchema),
}) satisfies z.ZodType<UserWhereFilters>

const getUserOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: userFilterSchema.nullable(),
}) satisfies z.ZodType<GetUserOutput>

const getUserByIdOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: userWithRoleSchema.nullable(),
}) satisfies z.ZodType<GetUserByIdOutput>

const updateUserOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: userWithRoleSchema.nullable(),
}) satisfies z.ZodType<UpdateUserOutput>

// Define the full schema for account based on Prisma model
const accountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  // Add any additional fields from the Prisma model
})

// Define the full schema for session based on Prisma model
const sessionSchema = z
  .object({
    id: z.string(),
    sessionToken: z.string(),
    userId: z.string(),
    expires: z.date(),
    createdAt: z.date(),
    ipAddress: z.string().nullable(),
    userAgent: z.string().nullable(),
    activatedAt: z.date().nullable(),
    endedAt: z.date().nullable(),
    lastActive: z.date().nullable(),
    isRevoked: z.boolean(),
    revokedAt: z.date().nullable(),
    revokedReason: z.string().nullable(),
  })
  .passthrough() // Allow extra fields not defined in the schema

// Define full user role schema based on Prisma model
const userRoleWithRoleSchema = z.object({
  id: z.string(),
  userId: z.string(),
  roleId: z.string(),
  role: roleSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Using the Prisma type for full user details
const userWithFullDetailsSchema = userWithRoleSchema
  .passthrough()
  .extend({
    accounts: z.array(accountSchema.passthrough()),
    sessions: z.array(sessionSchema),
    UserRole: z.array(userRoleWithRoleSchema.passthrough()),
  })
  .passthrough()

const getFullUserDetailsByIdOutputSchema = z
  .object({
    message: z.string(),
    success: z.boolean().default(true),
    data: userWithFullDetailsSchema.nullable(),
  })
  .passthrough()

export const userValidators = {
  userValidator,
  userFilterSelect,
  userWithRoleSelect,
  updateUserInputValidator,
  getUserByIdInputValidator,
}

export const userValidations = {
  userSchema,
  userWithRoleSchema,
  getUserInputSchema,
  getUserOutputSchema,
  getUserByIdInputSchema,
  getUserByIdOutputSchema,
  updateUserInputSchema,
  updateUserOutputSchema,
  userWithFullDetailsSchema,
  getFullUserDetailsByIdOutputSchema,
}

export interface UserTypes {
  User: User
  UserWithRole: UserWithRole
  UserFilterType: UserFilterType
  UserWhereFilters: UserWhereFilters
  GetUserInput: GetUserInput
  GetUserOutput: GetUserOutput
  GetUserByIdInput: GetUserByIdInput
  GetUserByIdOutput: GetUserByIdOutput
  UpdateUserInput: UpdateUserInput
  UpdateUserOutput: UpdateUserOutput
  UserWithFullDetails: UserWithFullDetails
  GetFullUserDetailsByIdOutput: GetFullUserDetailsByIdOutput
}
