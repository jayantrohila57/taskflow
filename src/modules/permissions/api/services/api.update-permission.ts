import { Prisma } from '@prisma/client'

import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { permissionValidations } from '../../validation/permission.validation'

/**
 * Update permission mutation endpoint
 *
 * @description Protected procedure that updates an existing permission in the database.
 * Requires authentication to access.
 *
 * @input {UpdatePermissionInput} - Object containing permission ID and fields to update
 * @output {UpdatePermissionOutput} - Object containing success status, message, and updated permission data
 *
 * @returns {Promise<UpdatePermissionOutput>} - Returns a promise that resolves to the updated permission data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If permission with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails (used instead of UPDATE_ERROR)
 */
export const updatePermission = protectedProcedure
  .input(permissionValidations.updatePermissionInputSchema)
  .output(permissionValidations.updatePermissionOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      const { id, ...updateData } = input

      try {
        // Check if permission exists
        const existingPermission = await ctx.db.permission.findUnique({
          where: { id },
        })

        if (!existingPermission) return NOT_FOUND({ permissionId: id })

        // Update permission
        const updatedPermission = await ctx.db.permission.update({
          where: { id },
          data: updateData,
        })

        return SUCCESS(updatedPermission)
      } catch (error) {
        // Handle potential Prisma errors, e.g., unique constraint violation
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002' // Unique constraint failed
        ) {
          return {
            message: `Permission with code '${updateData.code}' or name '${updateData.name}' might already exist on another permission.`,
            success: false,
            data: null,
          }
        }
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.PERMISSION?.UPDATE_PERMISSION || 'UPDATE_PERMISSION'),
  )
