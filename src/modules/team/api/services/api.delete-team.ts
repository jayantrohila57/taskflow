import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { teamValidations } from '../../validation/team.validation'

/**
 * Delete team mutation endpoint
 *
 * @description Protected procedure that soft-deletes a team from the database.
 * Sets the deletedAt field and marks the team as inactive and archived.
 * Note: Does not automatically remove associated TeamRoles.
 * Requires authentication to access.
 *
 * @input {DeleteTeamInput} - Object containing the team ID to delete
 * @output {DeleteTeamOutput} - Object containing success status, message, and deleted team ID
 *
 * @returns {Promise<DeleteTeamOutput>} - Returns a promise that resolves to the deletion confirmation
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If team with specified ID is not found or already deleted
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails (used instead of DELETION_ERROR)
 */
export const deleteTeam = protectedProcedure
  .input(teamValidations.deleteTeamInputSchema)
  .output(teamValidations.deleteTeamOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      try {
        // Check if team exists and is not already deleted
        const existingTeam = await ctx.db.team.findFirst({
          where: { id: input.id, deletedAt: null },
        })

        if (!existingTeam) return NOT_FOUND({ teamId: input.id })

        // Soft delete team
        await ctx.db.team.update({
          where: { id: input.id },
          data: {
            deletedAt: new Date(),
            isActive: false,
            isArchived: true,
          },
        })

        return SUCCESS({ id: input.id })
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.TEAM?.DELETE_TEAM || 'DELETE_TEAM'),
  )
