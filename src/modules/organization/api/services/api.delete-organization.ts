import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { organizations } from '../../validation/organization.validation'

/**
 * Delete organization mutation endpoint
 *
 * @description Protected procedure that deletes an organization from the database.
 * Requires authentication to access.
 *
 * @input {DeleteOrganizationInput} - Object containing organization ID
 * @output {DeleteOrganizationOutput} - Object containing success status and message
 *
 * @returns {Promise<DeleteOrganizationOutput>} - Returns a promise that resolves to the deletion result
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {DELETION_ERROR} - If database operation fails
 */
export const deleteOrganization = protectedProcedure
  .input(organizations.deleteOrganizationInputSchema)
  .output(organizations.deleteOrganizationOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })
      const deletedOrganization = await ctx.db.organization.delete({
        where: { id: input.id },
        select: {
          id: true,
          slug: true,
          image: true,
          title: true,
          description: true,
          coverImage: true,
          primaryEmail: true,
          missionStatement: true,
          visionStatement: true,
          foundedYear: true,
          timezone: true,
          language: true,
          currency: true,
          dateFormat: true,
          timeFormat: true,
          isActive: true,
          isVerified: true,
          isPublic: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          statusId: true,
          categoryId: true,
          typeId: true,
          industryId: true,
          organizationSizeId: true,
          createdByUserId: true,
        },
      })
      return SUCCESS(deletedOrganization)
    }, TAG.ORGANIZATION.DELETE_ORGANIZATION),
  )
