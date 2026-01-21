import { Prisma } from '@prisma/client'
import { z } from 'zod'

const sessionValidator = Prisma.validator<Prisma.SessionDefaultArgs>()({})
type Session = Prisma.SessionGetPayload<typeof sessionValidator>

const sessionSelect = Prisma.validator<Prisma.SessionDefaultArgs>()({
  select: {
    id: true,
    sessionToken: true,
    userId: true,
    expires: true,
    ipAddress: true,
    userAgent: true,
    activatedAt: true,
    endedAt: true,
    lastUsedAt: true,
    lastActive: true,
    isRevoked: true,
    revokedAt: true,
    revokedReason: true,
    createdAt: true,
    user: {
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    },
  },
})
type SessionSelect = Prisma.SessionGetPayload<typeof sessionSelect>

const getSessionByIdInputValidator = Prisma.validator<Prisma.SessionDefaultArgs>()({
  select: {
    id: true,
  },
})
type GetSessionByIdInput = Prisma.SessionGetPayload<typeof getSessionByIdInputValidator>

// Define a custom type that matches what we need for update operations
interface UpdateSessionInput {
  id: string
  isRevoked?: boolean
  revokedReason?: string | null
  lastUsedAt?: Date
  endedAt?: Date | null
}

const deleteSessionInputValidator = Prisma.validator<Prisma.SessionDefaultArgs>()({
  select: {
    id: true,
  },
})
type DeleteSessionInput = Prisma.SessionGetPayload<typeof deleteSessionInputValidator>

type GetSessionInput = {
  page?: number
  limit?: number
  search?: string
  userId?: string
  isActive?: boolean
  isRevoked?: boolean
}

type SessionWhereFilters = {
  total: number
  page: number
  limit: number
  items: SessionSelect[]
} | null

type GetSessionOutput = {
  message: string
  success?: boolean
  data: SessionWhereFilters
}

type GetSessionByIdOutput = {
  message: string
  success?: boolean
  data: SessionSelect | null
}

type UpdateSessionOutput = {
  message: string
  success?: boolean
  data: SessionSelect | null
}

type DeleteSessionOutput = {
  message: string
  success?: boolean
  data: SessionSelect | null
}

const sessionSchema = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  activatedAt: z.date().nullable(),
  endedAt: z.date().nullable(),
  lastUsedAt: z.date(),
  lastActive: z.date(),
  isRevoked: z.boolean(),
  revokedAt: z.date().nullable(),
  revokedReason: z.string().nullable(),
  createdAt: z.date(),
})

const sessionWithUserSchema = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  activatedAt: z.date().nullable(),
  endedAt: z.date().nullable(),
  lastUsedAt: z.date(),
  lastActive: z.date(),
  isRevoked: z.boolean(),
  revokedAt: z.date().nullable(),
  revokedReason: z.string().nullable(),
  createdAt: z.date(),
  user: z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    image: z.string().nullable(),
  }),
})

const getSessionInputSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  userId: z.string().optional(),
  isActive: z.boolean().optional(),
  isRevoked: z.boolean().optional(),
})

const getSessionByIdInputSchema = z.object({
  id: z.string(),
})

// Fix the type mismatch by defining a schema that matches our custom type
const updateSessionInputSchema = z.object({
  id: z.string(),
  isRevoked: z.boolean().optional(),
  revokedReason: z.string().nullable().optional(),
  lastUsedAt: z.date().optional(),
  endedAt: z.date().nullable().optional(),
})

const deleteSessionInputSchema = z.object({
  id: z.string(),
})

const sessionFilterSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  items: z.array(sessionWithUserSchema),
})

const getSessionOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: sessionFilterSchema.nullable(),
})

const getSessionByIdOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: sessionWithUserSchema.nullable(),
})

const updateSessionOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: sessionWithUserSchema.nullable(),
})

const deleteSessionOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: sessionWithUserSchema.nullable(),
})

export const sessionValidators = {
  sessionValidator,
  sessionSelect,
  getSessionByIdInputValidator,
  deleteSessionInputValidator,
}

export const sessionValidations = {
  sessionSchema,
  sessionWithUserSchema,
  getSessionInputSchema,
  getSessionOutputSchema,
  getSessionByIdInputSchema,
  getSessionByIdOutputSchema,
  updateSessionInputSchema,
  updateSessionOutputSchema,
  deleteSessionInputSchema,
  deleteSessionOutputSchema,
}

export interface SessionTypes {
  Session: Session
  SessionSelect: SessionSelect
  SessionWhereFilters: SessionWhereFilters
  GetSessionInput: GetSessionInput
  GetSessionOutput: GetSessionOutput
  GetSessionByIdInput: GetSessionByIdInput
  GetSessionByIdOutput: GetSessionByIdOutput
  UpdateSessionInput: UpdateSessionInput
  UpdateSessionOutput: UpdateSessionOutput
  DeleteSessionInput: DeleteSessionInput
  DeleteSessionOutput: DeleteSessionOutput
}
