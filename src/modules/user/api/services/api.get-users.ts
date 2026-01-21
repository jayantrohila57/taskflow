import { type Prisma } from '@prisma/client'

import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { userValidations } from '../../validation/user.validation'

/**
 * Get users query endpoint
 *
 * @description Protected procedure that retrieves a paginated list of users from the database.
 * Supports filtering and searching. Requires authentication to access.
 *
 * @input {GetUserInput} - Object containing pagination parameters (page, limit), search term, and filters
 * @output {GetUserOutput} - Object containing success status, message, and paginated user data
 *
 * @returns {Promise<GetUserOutput>} - Returns a promise that resolves to the paginated user list
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getUsers = protectedProcedure
  .input(userValidations.getUserInputSchema)
  .output(userValidations.getUserOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })
      const { page, limit, search, filters } = input
      const where: Prisma.UserWhereInput = {}
      if (filters) Object.assign(where, filters)
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ]
      }
      const [total, userList] = await Promise.all([
        ctx.db.user.count({ where }),
        ctx.db.user.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          include: { roles: true },
        }),
      ])

      // Add organizationLength field to each user
      const usersWithOrgLength = userList.map((user) => ({
        ...user,
        organizationLength: null,
      }))

      return SUCCESS({ total, page, limit, items: usersWithOrgLength })
    }, TAG.USER.GET_USER),
  )
