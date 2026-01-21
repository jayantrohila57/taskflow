import type { Prisma } from '@prisma/client'

import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { permissionValidations } from '../../validation/permission.validation'

/**
 * Get permissions query endpoint
 *
 * @description Protected procedure that retrieves permissions from the database.
 * Includes pagination, search, and filter functionality. Requires authentication to access.
 *
 * @input {GetPermissionInput} - Object containing pagination, search, and filter parameters
 * @output {GetPermissionOutput} - Object containing success status, message, and permission data
 *
 * @returns {Promise<GetPermissionOutput>} - Returns a promise that resolves to the permissions data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getPermissions = protectedProcedure
  .input(permissionValidations.getPermissionInputSchema)
  .output(permissionValidations.getPermissionOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      const { page = 1, limit = 10, search, filters } = input
      const skip = (page - 1) * limit

      try {
        // Build where conditions based on search and filters
        const where: Prisma.PermissionWhereInput = {}

        if (search) {
          where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { code: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { category: { contains: search, mode: 'insensitive' } },
          ]
        }

        if (filters) {
          if (filters.name) {
            where.name = { contains: filters.name, mode: 'insensitive' }
          }
          if (filters.code) {
            where.code = { contains: filters.code, mode: 'insensitive' }
          }
          if (filters.category) {
            where.category = {
              contains: filters.category,
              mode: 'insensitive',
            }
          }
          if (filters.isActive !== undefined) {
            where.isActive = filters.isActive
          }
          if (filters.isSystem !== undefined) {
            where.isSystem = filters.isSystem
          }
        }

        // Get total count
        const total = await ctx.db.permission.count({ where })

        // Get paginated permissions
        const permissions = await ctx.db.permission.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        })

        return SUCCESS({
          total,
          page,
          limit,
          items: permissions,
        })
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.PERMISSION?.GET_PERMISSIONS || 'GET_PERMISSIONS'),
  )
