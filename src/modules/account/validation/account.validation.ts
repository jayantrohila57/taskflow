import { Prisma } from '@prisma/client'
import { z } from 'zod'

const accountValidator = Prisma.validator<Prisma.AccountDefaultArgs>()({})
type Account = Prisma.AccountGetPayload<typeof accountValidator>

const accountSelect = Prisma.validator<Prisma.AccountDefaultArgs>()({
  select: {
    id: true,
    userId: true,
    type: true,
    provider: true,
    providerAccountId: true,
    refresh_token: true,
    access_token: true,
    expires_at: true,
    token_type: true,
    scope: true,
    id_token: true,
    session_state: true,
    refresh_token_expires_in: true,
  },
})
type AccountSelect = Prisma.AccountGetPayload<typeof accountSelect>

const getAccountByIdInputValidator = Prisma.validator<Prisma.AccountDefaultArgs>()({
  select: {
    id: true,
  },
})
type GetAccountByIdInput = Prisma.AccountGetPayload<typeof getAccountByIdInputValidator>

const getAccountByUserIdInputValidator = Prisma.validator<Prisma.AccountDefaultArgs>()({
  select: {
    userId: true,
  },
})
type GetAccountByUserIdInput = Prisma.AccountGetPayload<typeof getAccountByUserIdInputValidator>

const createAccountInputValidator = Prisma.validator<Prisma.AccountDefaultArgs>()({
  select: {
    userId: true,
    type: true,
    provider: true,
    providerAccountId: true,
    refresh_token: true,
    access_token: true,
    expires_at: true,
    token_type: true,
    scope: true,
    id_token: true,
    session_state: true,
    refresh_token_expires_in: true,
  },
})
type CreateAccountInput = Prisma.AccountGetPayload<typeof createAccountInputValidator>

const updateAccountInputValidator = Prisma.validator<Prisma.AccountDefaultArgs>()({
  select: {
    id: true,
    userId: true,
    type: true,
    provider: true,
    providerAccountId: true,
    refresh_token: true,
    access_token: true,
    expires_at: true,
    token_type: true,
    scope: true,
    id_token: true,
    session_state: true,
    refresh_token_expires_in: true,
  },
})
type UpdateAccountInput = Prisma.AccountGetPayload<typeof updateAccountInputValidator>

const deleteAccountInputValidator = Prisma.validator<Prisma.AccountDefaultArgs>()({
  select: {
    id: true,
  },
})
type DeleteAccountInput = Prisma.AccountGetPayload<typeof deleteAccountInputValidator>

type GetAccountInput = {
  page?: number
  limit?: number
  search?: string
  userId?: string
}

type AccountWhereFilters = {
  total: number
  page: number
  limit: number
  accounts: AccountSelect[]
} | null

type GetAccountOutput = {
  message: string
  success?: boolean
  data: AccountWhereFilters
}

type GetAccountByIdOutput = {
  message: string
  success?: boolean
  data: AccountSelect | null
}

type GetAccountByUserIdOutput = {
  message: string
  success?: boolean
  data: AccountSelect[] | null
}

type CreateAccountOutput = {
  message: string
  success?: boolean
  data: AccountSelect | null
}

type UpdateAccountOutput = {
  message: string
  success?: boolean
  data: AccountSelect | null
}

type DeleteAccountOutput = {
  message: string
  success?: boolean
  data: AccountSelect | null
}

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
  refresh_token_expires_in: z.number().nullable(),
})

const getAccountInputSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  userId: z.string().optional(),
})

const getAccountByIdInputSchema = z.object({
  id: z.string(),
})

const getAccountByUserIdInputSchema = z.object({
  userId: z.string(),
})

const createAccountInputSchema = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable().default(null),
  access_token: z.string().nullable().default(null),
  expires_at: z.number().nullable().default(null),
  token_type: z.string().nullable().default(null),
  scope: z.string().nullable().default(null),
  id_token: z.string().nullable().default(null),
  session_state: z.string().nullable().default(null),
  refresh_token_expires_in: z.number().nullable().default(null),
})

const updateAccountInputSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  type: z.string().optional(),
  provider: z.string().optional(),
  providerAccountId: z.string().optional(),
  refresh_token: z.string().nullable().optional(),
  access_token: z.string().nullable().optional(),
  expires_at: z.number().nullable().optional(),
  token_type: z.string().nullable().optional(),
  scope: z.string().nullable().optional(),
  id_token: z.string().nullable().optional(),
  session_state: z.string().nullable().optional(),
  refresh_token_expires_in: z.number().nullable().optional(),
})

const deleteAccountInputSchema = z.object({
  id: z.string(),
})

const accountFilterSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  accounts: z.array(accountSchema),
})

const getAccountOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: accountFilterSchema.nullable(),
})

const getAccountByIdOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: accountSchema.nullable(),
})

const getAccountByUserIdOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: z.array(accountSchema).nullable(),
})

const createAccountOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: accountSchema.nullable(),
})

const updateAccountOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: accountSchema.nullable(),
})

const deleteAccountOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: accountSchema.nullable(),
})

export const accountValidators = {
  accountValidator,
  accountSelect,
  getAccountByIdInputValidator,
  getAccountByUserIdInputValidator,
  createAccountInputValidator,
  updateAccountInputValidator,
  deleteAccountInputValidator,
}

export const accounts = {
  getAccountInputSchema,
  getAccountOutputSchema,
  getAccountByIdInputSchema,
  getAccountByIdOutputSchema,
  getAccountByUserIdInputSchema,
  getAccountByUserIdOutputSchema,
  createAccountInputSchema,
  createAccountOutputSchema,
  updateAccountInputSchema,
  updateAccountOutputSchema,
  deleteAccountInputSchema,
  deleteAccountOutputSchema,
}

export interface AccountTypes {
  Account: Account
  AccountSelect: AccountSelect
  AccountWhereFilters: AccountWhereFilters
  GetAccountInput: GetAccountInput
  GetAccountOutput: GetAccountOutput
  GetAccountByIdInput: GetAccountByIdInput
  GetAccountByIdOutput: GetAccountByIdOutput
  GetAccountByUserIdInput: GetAccountByUserIdInput
  GetAccountByUserIdOutput: GetAccountByUserIdOutput
  CreateAccountInput: CreateAccountInput
  CreateAccountOutput: CreateAccountOutput
  UpdateAccountInput: UpdateAccountInput
  UpdateAccountOutput: UpdateAccountOutput
  DeleteAccountInput: DeleteAccountInput
  DeleteAccountOutput: DeleteAccountOutput
}
