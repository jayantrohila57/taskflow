import { z } from 'zod'

import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'

/**
 * Create session mutation endpoint
 *
 * @description Protected procedure that creates a new session in the database.
 * Requires authentication and authorization to access.
 *
 * @input {CreateSessionInput} - Object containing session data
 * @output {CreateSessionOutput} - Object containing success status, message, and created session data
 *
 * @returns {Promise<CreateSessionOutput>} - Returns a promise that resolves to the creation result
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const createSession = protectedProcedure
  .input(
    z.object({
      userId: z.string(),
      expires: z.date(),
      sessionToken: z.string(),
      ipAddress: z.string().optional(),
      userAgent: z.string().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })

      const session = await ctx.db.session.create({
        data: {
          userId: input.userId,
          expires: input.expires,
          sessionToken: input.sessionToken,
          ipAddress: input.ipAddress || null,
          userAgent: input.userAgent || null,
          lastUsedAt: new Date(),
          lastActive: new Date(),
          createdAt: new Date(),
        },
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

      return SUCCESS(session)
    }, TAG.SESSION.CREATE_SESSION),
  )
