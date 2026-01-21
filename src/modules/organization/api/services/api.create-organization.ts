import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { organizations } from '../../validation/organization.validation'

/**
 * Create organization mutation endpoint
 *
 * @description Protected procedure that creates a new organization in the database.
 * Requires authentication to access.
 *
 * @input {CreateOrganizationInput} - Object containing organization details (name, slug, description, etc.)
 * @output {CreateOrganizationOutput} - Object containing success status, message, and created organization data
 *
 * @returns {Promise<CreateOrganizationOutput>} - Returns a promise that resolves to the created organization
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {CREATION_ERROR} - If database operation fails
 */
export const createOrganization = protectedProcedure
  .input(organizations.createOrganizationInputSchema)
  .output(organizations.createOrganizationOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })

      // Extract all fields from input according to validation
      const {
        slug,
        image = null,
        title,
        description = null,
        coverImage = null,
        primaryEmail = null,
        missionStatement = null,
        visionStatement = null,
        foundedYear = null,
        timezone = 'UTC',
        language = 'en-US',
        currency = 'USD',
        dateFormat = 'YYYY-MM-DD',
        timeFormat = 'HH:mm',
        isActive = true,
        isVerified = false,
        isPublic = true,
        statusId = null,
        categoryId = null,
        typeId = null,
        industryId = null,
        organizationSizeId = null,
        createdByUserId = null,
      } = input

      const createdOrganization = await ctx.db.organization.create({
        data: {
          slug,
          image,
          title,
          description,
          coverImage,
          primaryEmail,
          missionStatement,
          visionStatement,
          foundedYear,
          timezone,
          language,
          currency,
          dateFormat,
          timeFormat,
          isActive,
          isVerified,
          isPublic,
          statusId,
          categoryId,
          typeId,
          industryId,
          organizationSizeId,
          createdByUserId,
        },
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
      return SUCCESS(createdOrganization)
    }, TAG.ORGANIZATION.CREATE_ORGANIZATION),
  )
