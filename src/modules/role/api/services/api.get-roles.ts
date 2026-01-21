import type { Prisma } from '@prisma/client'

import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { roleValidations } from '../../validation/role.validation'

/**
 * Get roles query endpoint
 *
 * @description Protected procedure that retrieves roles from the database.
 * Includes pagination, search, and filter functionality. Requires authentication to access.
 *
 * @input {GetRoleInput} - Object containing pagination, search, and filter parameters
 * @output {GetRoleOutput} - Object containing success status, message, and role data
 *
 * @returns {Promise<GetRoleOutput>} - Returns a promise that resolves to the roles data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getRoles = protectedProcedure
  .input(roleValidations.getRoleInputSchema)
  .output(roleValidations.getRoleOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      const { page = 1, limit = 10, search, filters } = input
      const skip = (page - 1) * limit

      try {
        // Build where conditions based on search and filters
        const where: Prisma.RoleWhereInput = {}

        if (search) {
          where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { code: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ]
        }

        if (filters) {
          if (filters.name) {
            where.name = { contains: filters.name, mode: 'insensitive' }
          }
          if (filters.code) {
            where.code = { contains: filters.code, mode: 'insensitive' }
          }
          if (filters.isSystem !== undefined) {
            where.isSystem = filters.isSystem
          }
          if (filters.isActive !== undefined) {
            where.isActive = filters.isActive
          }
          if (filters.isDefault !== undefined) {
            where.isDefault = filters.isDefault
          }
          if (filters.level !== undefined) {
            where.level = filters.level
          }
        }

        // Get total count
        const total = await ctx.db.role.count({ where })

        // Get paginated roles
        const roles = await ctx.db.role.findMany({
          where,
          include: { permissions: { include: { permission: true } } },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        })

        return SUCCESS({
          total,
          page,
          limit,
          items: roles,
        })
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.ROLE?.GET_ROLES || 'GET_ROLES'),
  )
