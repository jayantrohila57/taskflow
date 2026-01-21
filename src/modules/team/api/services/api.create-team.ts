import { Prisma } from '@prisma/client'

import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { teamValidations } from '../../validation/team.validation'

/**
 * Create team mutation endpoint
 *
 * @description Protected procedure that creates a new team in the database.
 * Note: Does not handle role assignments directly. Roles are managed via TeamRole.
 * Requires authentication to access.
 *
 * @input {CreateTeamInput} - Object containing team details to be created
 * @output {CreateTeamOutput} - Object containing success status, message, and created team data
 *
 * @returns {Promise<CreateTeamOutput>} - Returns a promise that resolves to the created team data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails (used instead of CREATION_ERROR)
 * @throws {CONFLICT} - If a team with the same name or slug already exists.
 */
export const createTeam = protectedProcedure
  .input(teamValidations.createTeamInputSchema)
  .output(teamValidations.createTeamOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, RETRIEVAL_ERROR, CONFLICT } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      try {
        // Create team. Prisma handles unique constraints (name, slug).
        const team = await ctx.db.team.create({
          data: {
            name: input.name,
            slug: input.slug,
            organizationId: input.organizationId,
            description: input.description,
            color: input.color,
            logo: input.logo,
            metadata: input.metadata ? JSON.parse(JSON.stringify(input.metadata)) : undefined,
            visibility: input.visibility,
            isDiscoverable: input.isDiscoverable,
            isActive: input.isActive,
            isPrivate: input.isPrivate,
            isDefault: input.isDefault,
            statusId: input.statusId,
            typeId: input.typeId,
          },
          include: { roles: true }, // Include roles in the response
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
        }

        return SUCCESS(formattedTeam)
      } catch (error) {
        // Handle potential Prisma unique constraint violation
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002' // Unique constraint failed
        ) {
          return CONFLICT({
            fields: error.meta?.target,
            message: `Team with the same ${error.meta?.target?.toString()} already exists.`,
          })
        }
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.TEAM?.CREATE_TEAM || 'CREATE_TEAM'),
  )
