import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { organizations } from '../../validation/organization.validation'

/**
 * Get organization by ID query endpoint
 *
 * @description Protected procedure that retrieves a single organization by its ID from the database.
 * Requires authentication to access.
 *
 * @input {GetOrganizationByIdInput} - Object containing organization ID
 * @output {GetOrganizationByIdOutput} - Object containing success status, message, and organization data
 *
 * @returns {Promise<GetOrganizationByIdOutput>} - Returns a promise that resolves to the organization data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getOrganizationById = protectedProcedure
  .input(organizations.getOrganizationByIdInputSchema)
  .output(organizations.getOrganizationByIdOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })
      const organization = await ctx.db.organization.findUnique({
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
      return SUCCESS(organization)
    }, TAG.ORGANIZATION.GET_ORGANIZATION_BY_ID),
  )
