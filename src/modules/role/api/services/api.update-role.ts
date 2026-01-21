import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { roleValidations } from '../../validation/role.validation'

/**
 * Update role mutation endpoint
 *
 * @description Protected procedure that updates an existing role in the database.
 * Handles updating role details and associated permissions. Requires authentication to access.
 *
 * @input {UpdateRoleInput} - Object containing role ID, updated details, and optional permission IDs
 * @output {UpdateRoleOutput} - Object containing success status, message, and updated role data
 *
 * @returns {Promise<UpdateRoleOutput>} - Returns a promise that resolves to the updated role data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If role with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails (used instead of UPDATE_ERROR)
 */
export const updateRole = protectedProcedure
  .input(roleValidations.updateRoleInputSchema)
  .output(roleValidations.updateRoleOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      const { id, permissions: permissionIds, ...roleData } = input

      try {
        // Check if role exists
        const existingRole = await ctx.db.role.findUnique({
          where: { id },
        })

        if (!existingRole) return NOT_FOUND({ roleId: id })

        // Update role and permissions
        const role = await ctx.db.role.update({
          where: { id },
          data: {
            ...roleData,
            permissions: permissionIds
              ? {
                  deleteMany: {}, // Remove existing permissions
                  create: permissionIds.map((permissionId) => ({
                    permission: {
                      connect: { id: permissionId },
                    },
                  })),
                }
              : undefined,
          },
          include: { permissions: { include: { permission: true } } },
        })

        return SUCCESS(role)
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.ROLE?.UPDATE_ROLE || 'UPDATE_ROLE'),
  )
