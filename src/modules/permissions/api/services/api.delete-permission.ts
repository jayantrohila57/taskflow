import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { permissionValidations } from '../../validation/permission.validation'

/**
 * Delete permission mutation endpoint
 *
 * @description Protected procedure that deletes a permission from the database.
 * This is a soft delete operation that sets the deletedAt field.
 * Note: Does not automatically remove associated RolePermissions.
 * Requires authentication to access.
 *
 * @input {DeletePermissionInput} - Object containing the permission ID to delete
 * @output {DeletePermissionOutput} - Object containing success status, message, and deleted permission ID
 *
 * @returns {Promise<DeletePermissionOutput>} - Returns a promise that resolves to the deletion confirmation
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If permission with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails (used instead of DELETION_ERROR)
 */
export const deletePermission = protectedProcedure
  .input(permissionValidations.deletePermissionInputSchema)
  .output(permissionValidations.deletePermissionOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      try {
        // Check if permission exists
        const existingPermission = await ctx.db.permission.findUnique({
          where: { id: input.id },
        })

        if (!existingPermission) return NOT_FOUND({ permissionId: input.id })

        // Soft delete permission
        await ctx.db.permission.update({
          where: { id: input.id },
          data: {
            deletedAt: new Date(),
            isActive: false,
          },
        })

        return SUCCESS({ id: input.id })
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.PERMISSION?.DELETE_PERMISSION || 'DELETE_PERMISSION'),
  )
