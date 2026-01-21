import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { permissionValidations } from '../../validation/permission.validation'

/**
 * Get permission by ID query endpoint
 *
 * @description Protected procedure that retrieves a single permission by its ID from the database.
 * Requires authentication to access.
 *
 * @input {GetPermissionByIdInput} - Object containing the permission ID to retrieve
 * @output {GetPermissionByIdOutput} - Object containing success status, message, and permission data
 *
 * @returns {Promise<GetPermissionByIdOutput>} - Returns a promise that resolves to the permission data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If permission with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getPermissionById = protectedProcedure
  .input(permissionValidations.getPermissionByIdInputSchema)
  .output(permissionValidations.getPermissionByIdOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      try {
        const permission = await ctx.db.permission.findUnique({
          where: { id: input.id },
        })

        if (!permission) return NOT_FOUND({ permissionId: input.id })

        return SUCCESS(permission)
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.PERMISSION?.GET_PERMISSION_BY_ID || 'GET_PERMISSION_BY_ID'),
  )
