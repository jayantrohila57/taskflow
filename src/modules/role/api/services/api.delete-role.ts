import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { roleValidations } from '../../validation/role.validation'

/**
 * Delete role mutation endpoint
 *
 * @description Protected procedure that deletes a role from the database.
 * This is a soft delete operation that sets the deletedAt field.
 * Note: Does not automatically remove associated permissions.
 * Requires authentication to access.
 *
 * @input {DeleteRoleInput} - Object containing the role ID to delete
 * @output {DeleteRoleOutput} - Object containing success status, message, and deleted role ID
 *
 * @returns {Promise<DeleteRoleOutput>} - Returns a promise that resolves to the deletion confirmation
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If role with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails (used instead of DELETION_ERROR)
 */
export const deleteRole = protectedProcedure
  .input(roleValidations.deleteRoleInputSchema)
  .output(roleValidations.deleteRoleOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      try {
        // Check if role exists
        const existingRole = await ctx.db.role.findUnique({
          where: { id: input.id },
        })

        if (!existingRole) return NOT_FOUND({ roleId: input.id })

        // Soft delete role
        await ctx.db.role.update({
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
    }, TAG.ROLE?.DELETE_ROLE || 'DELETE_ROLE'),
  )
