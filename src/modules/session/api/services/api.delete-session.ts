import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { sessionValidations } from '../../validation/session.validation'

/**
 * Delete session mutation endpoint
 *
 * @description Protected procedure that deletes a session from the database.
 * In practice, this will revoke the session rather than physically deleting it.
 * Requires authentication and authorization to access.
 *
 * @input {DeleteSessionInput} - Object containing the session ID to delete
 * @output {DeleteSessionOutput} - Object containing success status, message, and deleted session data
 *
 * @returns {Promise<DeleteSessionOutput>} - Returns a promise that resolves to the deletion result
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If session with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const deleteSession = protectedProcedure
  .input(sessionValidations.deleteSessionInputSchema)
  .output(sessionValidations.deleteSessionOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ sessionId: input.id })

      // Check if session exists
      const existingSession = await ctx.db.session.findUnique({
        where: { id: input.id },
      })

      if (!existingSession) return NOT_FOUND({ sessionId: input.id })

      // Instead of deleting, we revoke the session
      const deletedSession = await ctx.db.session.update({
        where: { id: input.id },
        data: {
          isRevoked: true,
          revokedAt: new Date(),
          revokedReason: 'Manually deleted by admin',
          endedAt: new Date(),
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

      return SUCCESS(deletedSession)
    }, TAG.SESSION.DELETE_SESSION),
  )
