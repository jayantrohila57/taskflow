import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { teamValidations } from '../../validation/team.validation'

/**
 * Get team by ID query endpoint
 *
 * @description Protected procedure that retrieves a single team by its ID from the database.
 * Includes the team's role information. Requires authentication to access.
 *
 * @input {GetTeamByIdInput} - Object containing the team ID to retrieve
 * @output {GetTeamByIdOutput} - Object containing success status, message, and team data
 *
 * @returns {Promise<GetTeamByIdOutput>} - Returns a promise that resolves to the team data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If team with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getTeamById = protectedProcedure
  .input(teamValidations.getTeamByIdInputSchema)
  .output(teamValidations.getTeamByIdOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      try {
        const team = await ctx.db.team.findUnique({
          where: { id: input.id, deletedAt: null }, // Ensure team is not soft-deleted
          include: { roles: true }, // Include roles
        })

        if (!team) return NOT_FOUND({ teamId: input.id })

        // Format team to match schema
        const formattedTeam = {
          ...team,
          description: team.description || '',
          metadata: team.metadata ? JSON.parse(JSON.stringify(team.metadata)) : {},
          color: team.color || '#000000',
          logo: team.logo || '',
          statusId: team.statusId || null,
          typeId: team.typeId || null,
          roles: team.roles, // Ensure roles are included in the response
        }

        return SUCCESS(formattedTeam)
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.TEAM?.GET_TEAM_BY_ID || 'GET_TEAM_BY_ID'),
  )
