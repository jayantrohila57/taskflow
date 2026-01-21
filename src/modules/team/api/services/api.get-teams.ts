import type { Prisma } from '@prisma/client'

import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { teamValidations } from '../../validation/team.validation'

/**
 * Get teams query endpoint
 *
 * @description Protected procedure that retrieves teams from the database.
 * Includes pagination, search, and filter functionality. Requires authentication to access.
 *
 * @input {GetTeamInput} - Object containing pagination, search, and filter parameters
 * @output {GetTeamOutput} - Object containing success status, message, and team data
 *
 * @returns {Promise<GetTeamOutput>} - Returns a promise that resolves to the teams data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getTeams = protectedProcedure
  .input(teamValidations.getTeamInputSchema)
  .output(teamValidations.getTeamOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      const { page = 1, limit = 10, search, filters } = input
      const skip = (page - 1) * limit

      try {
        // Build where conditions based on search and filters
        const where: Prisma.TeamWhereInput = { deletedAt: null } // Exclude soft-deleted teams by default

        if (search) {
          where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { slug: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ]
        }

        if (filters) {
          if (filters.name) {
            where.name = { contains: filters.name, mode: 'insensitive' }
          }
          if (filters.slug) {
            where.slug = { contains: filters.slug, mode: 'insensitive' }
          }
          if (filters.organizationId) {
            where.organizationId = filters.organizationId
          }
          if (filters.visibility) {
            where.visibility = filters.visibility
          }
          if (filters.isActive !== undefined) {
            where.isActive = filters.isActive
          }
          if (filters.isPrivate !== undefined) {
            where.isPrivate = filters.isPrivate
          }
          if (filters.isDefault !== undefined) {
            where.isDefault = filters.isDefault
          }
        }

        // Get total count
        const total = await ctx.db.team.count({ where })

        // Get paginated teams
        const teams = await ctx.db.team.findMany({
          where,
          include: { roles: true }, // Include roles
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        })

        // Format teams to match schema
        const formattedTeams = teams.map((team) => ({
          ...team,
          description: team.description || '',
          metadata: team.metadata ? JSON.parse(JSON.stringify(team.metadata)) : {},
          color: team.color || '#000000',
          logo: team.logo || '',
          statusId: team.statusId || null,
          typeId: team.typeId || null,
          roles: team.roles, // Ensure roles are included in the response
        }))

        return SUCCESS({
          page,
          limit,
          total,
          items: formattedTeams,
        })
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.TEAM?.GET_TEAMS || 'GET_TEAMS'),
  )
