import { debugError } from '@/lib/utils'
import argon2, { type Options } from 'argon2'
import { z } from 'zod'

// 1. ENV validation & parsing
const EnvSchema = z
  .object({
    ARGON2_MEMORY_COST: z.string().optional().default('65536'),
    ARGON2_TIME_COST: z.string().optional().default('3'),
    ARGON2_PARALLELISM: z.string().optional().default('1'),
  })
  .transform((env) => ({
    memoryCost: parseInt(env.ARGON2_MEMORY_COST, 10),
    timeCost: parseInt(env.ARGON2_TIME_COST, 10),
    parallelism: parseInt(env.ARGON2_PARALLELISM, 10),
  }))

const { memoryCost, timeCost, parallelism } = EnvSchema.parse(process.env)

// 2. Default Argon2 options
const defaultOpts: Options = {
  type: argon2.argon2id,
  memoryCost,
  timeCost,
  parallelism,
}

// 3. Password input schema
const PasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password too long')
  .refine((p) => /[A-Z]/.test(p), 'Must include an uppercase letter')
  .refine((p) => /[0-9]/.test(p), 'Must include a number')

// 4. Hash function
export async function hashPassword(raw: unknown, opts: Options = defaultOpts): Promise<string> {
  const password = PasswordSchema.parse(raw)
  try {
    return await argon2.hash(password, opts)
  } catch (err) {
    if (err instanceof Error) debugError('hashPassword failed', err)
    throw new Error('Internal error while hashing password')
  }
}

// 5. Verify function
export async function verifyPassword(hashed: string, raw: unknown): Promise<boolean> {
  const password = PasswordSchema.parse(raw)
  try {
    return await argon2.verify(hashed, password)
  } catch (err) {
    if (err instanceof Error) debugError('verifyPassword failed', err)
    return false
  }
}
