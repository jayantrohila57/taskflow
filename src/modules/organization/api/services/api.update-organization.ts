import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { organizations } from '../../validation/organization.validation'

/**
 * Update organization mutation endpoint
 *
 * @description Protected procedure that updates an organization in the database.
 * Requires authentication to access.
 *
 * @input {UpdateOrganizationInput} - Object containing organization ID and fields to update
 * @output {UpdateOrganizationOutput} - Object containing success status, message, and updated organization data
 *
 * @returns {Promise<UpdateOrganizationOutput>} - Returns a promise that resolves to the updated organization
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {UPDATE_ERROR} - If database operation fails
 */
export const updateOrganization = protectedProcedure
  .input(organizations.updateOrganizationInputSchema)
  .output(organizations.updateOrganizationOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })
      const { id, ...updateData } = input
      const updatedOrganization = await ctx.db.organization.update({
        where: { id },
        data: updateData,
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
      return SUCCESS(updatedOrganization)
    }, TAG.ORGANIZATION.UPDATE_ORGANIZATION),
  )
