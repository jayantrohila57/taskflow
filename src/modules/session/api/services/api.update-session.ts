import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { sessionValidations } from '../../validation/session.validation'

/**
 * Update session mutation endpoint
 *
 * @description Protected procedure that updates session information in the database.
 * Requires authentication and authorization to access.
 *
 * @input {UpdateSessionInput} - Object containing session ID and fields to update
 * @output {UpdateSessionOutput} - Object containing success status, message, and updated session data
 *
 * @returns {Promise<UpdateSessionOutput>} - Returns a promise that resolves to the update result
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If session with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const updateSession = protectedProcedure
  .input(sessionValidations.updateSessionInputSchema)
  .output(sessionValidations.updateSessionOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })
      const { id, ...updateData } = input

      // Create data object with typed properties
      const dataToUpdate: {
        isRevoked?: boolean
        revokedAt?: Date | null
        revokedReason?: string | null
        lastUsedAt?: Date
        endedAt?: Date | null
      } = { ...updateData }

      // If session is being revoked, set revokedAt to current date
      if (dataToUpdate.isRevoked === true && !dataToUpdate.revokedAt) {
        dataToUpdate.revokedAt = new Date()
      }

      // Check if session exists
      const existingSession = await ctx.db.session.findUnique({
        where: { id },
      })

      if (!existingSession) return NOT_FOUND({ sessionId: id })

      const updatedSession = await ctx.db.session.update({
        where: { id },
        data: dataToUpdate,
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

      return SUCCESS(updatedSession)
    }, TAG.SESSION.UPDATE_SESSION),
  )
