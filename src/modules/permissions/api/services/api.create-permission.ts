import { Prisma } from '@prisma/client'

import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { permissionValidations } from '../../validation/permission.validation'

/**
 * Create permission mutation endpoint
 *
 * @description Protected procedure that creates a new permission in the database.
 * Requires authentication to access.
 *
 * @input {CreatePermissionInput} - Object containing permission details to be created
 * @output {CreatePermissionOutput} - Object containing success status, message, and created permission data
 *
 * @returns {Promise<CreatePermissionOutput>} - Returns a promise that resolves to the created permission data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails (used instead of CREATION_ERROR)
 */
export const createPermission = protectedProcedure
  .input(permissionValidations.createPermissionInputSchema)
  .output(permissionValidations.createPermissionOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      try {
        const permission = await ctx.db.permission.create({
          data: input,
        })

        return SUCCESS(permission)
      } catch (error) {
        // Handle potential Prisma errors, e.g., unique constraint violation
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002' // Unique constraint failed
        ) {
          return {
            message: `Permission with code '${input.code}' or name '${input.name}' already exists.`,
            success: false,
            data: null,
          }
        }
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.PERMISSION?.CREATE_PERMISSION || 'CREATE_PERMISSION'),
  )
