import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { teamValidations } from '../../validation/team.validation'

/**
 * Update team mutation endpoint
 *
 * @description Protected procedure that updates an existing team in the database.
 * Handles updating team details and associated members. Requires authentication to access.
 *
 * @input {UpdateTeamInput} - Object containing team ID and updated details
 * @output {UpdateTeamOutput} - Object containing success status, message, and updated team data
 *
 * @returns {Promise<UpdateTeamOutput>} - Returns a promise that resolves to the updated team data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If team with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const updateTeam = protectedProcedure
  .input(teamValidations.updateTeamInputSchema)
  .output(teamValidations.updateTeamOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      const { id, ...teamData } = input

      try {
        // Check if team exists
        const existingTeam = await ctx.db.team.findUnique({
          where: { id },
          include: { roles: true }, // Include roles to match output schema
        })

        if (!existingTeam) return NOT_FOUND({ teamId: id })

        // Update team
        const team = await ctx.db.team.update({
          where: { id },
          data: {
            ...teamData,
            metadata: teamData.metadata ? JSON.parse(JSON.stringify(teamData.metadata)) : undefined,
          },
          include: { roles: true }, // Include roles in the update result
        })

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
        if (error instanceof Error) {
          return RETRIEVAL_ERROR(error.message)
        }
        return RETRIEVAL_ERROR('An unknown error occurred')
      }
    }, TAG.TEAM?.UPDATE_TEAM || 'UPDATE_TEAM'),
  )
