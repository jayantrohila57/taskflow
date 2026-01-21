import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { sessionValidations } from '../../validation/session.validation'

/**
 * Get session by ID query endpoint
 *
 * @description Protected procedure that retrieves a single session by its ID from the database.
 * Includes the user information. Requires authentication to access.
 *
 * @input {GetSessionByIdInput} - Object containing the session ID to retrieve
 * @output {GetSessionByIdOutput} - Object containing success status, message, and session data
 *
 * @returns {Promise<GetSessionByIdOutput>} - Returns a promise that resolves to the session data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If session with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getSessionById = protectedProcedure
  .input(sessionValidations.getSessionByIdInputSchema)
  .output(sessionValidations.getSessionByIdOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ sessionId: input.id })
      const session = await ctx.db.session.findUnique({
        where: { id: input.id },
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
      if (!session) return NOT_FOUND({ sessionId: input.id })

      return SUCCESS(session)
    }, TAG.SESSION.GET_SESSION_BY_ID),
  )
