import { type Prisma } from '@prisma/client'

import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { organizations } from '../../validation/organization.validation'

/**
 * Get organizations query endpoint
 *
 * @description Protected procedure that retrieves a paginated list of organizations from the database.
 * Supports searching. Requires authentication to access.
 *
 * @input {GetOrganizationsInput} - Object containing pagination parameters (page, limit) and search term
 * @output {GetOrganizationsOutput} - Object containing success status, message, and paginated organization data
 *
 * @returns {Promise<GetOrganizationsOutput>} - Returns a promise that resolves to the paginated organization list
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getOrganizations = protectedProcedure
  .input(organizations.getOrganizationInputSchema)
  .output(organizations.getOrganizationOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })
      const { page, limit, search } = input
      const where: Prisma.OrganizationWhereInput = {}
      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { slug: { contains: search, mode: 'insensitive' } },
          { industryId: { contains: search, mode: 'insensitive' } },
          { primaryEmail: { contains: search, mode: 'insensitive' } },
        ]
      }
      const [total, organizationList] = await Promise.all([
        ctx.db.organization.count({ where }),
        ctx.db.organization.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
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
        }),
      ])
      return SUCCESS({ total, page, limit, organizations: organizationList })
    }, TAG.ORGANIZATION.GET_ORGANIZATIONS),
  )
