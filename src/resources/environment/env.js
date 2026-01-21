import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    AUTH_SECRET: process.env.NODE_ENV === 'production' ? z.string() : z.string().optional(),
    AUTH_GITHUB_ID: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    VAPID_PRIVATE_KEY: z.string(),
    SKIP_ENV_VALIDATION: z.string().optional(),
    USE_DEBUG_LOGS: z.boolean(),
    REDIS_USERNAME: z.string(),
    REDIS_PASSWORD: z.string(),
    REDIS_SOCKET_HOST: z.string(),
    REDIS_SOCKET_PORT: z.number(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: z.string(),
    NEXT_PUBLIC_USE_DEBUG_LOGS: z.boolean(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    REDIS_USERNAME: process.env.REDIS_USERNAME,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_SOCKET_HOST: process.env.REDIS_SOCKET_HOST,
    REDIS_SOCKET_PORT: process.env.REDIS_SOCKET_PORT,
    VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION,
    USE_DEBUG_LOGS: process.env.USE_DEBUG_LOGS,
    NEXT_PUBLIC_USE_DEBUG_LOGS: process.env.NEXT_PUBLIC_USE_DEBUG_LOGS,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})

// Validate critical production environment variables
if (env.NODE_ENV === 'production' && !env.SKIP_ENV_VALIDATION) {
  try {
    if (!env.AUTH_SECRET) {
      throw new Error('AUTH_SECRET is required in production')
    }
    if (!env.DATABASE_URL) {
      throw new Error('DATABASE_URL is required in production')
    }
  } catch (error) {
    throw error
  }
}
