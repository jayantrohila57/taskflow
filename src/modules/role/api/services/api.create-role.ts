import { Prisma } from '@prisma/client'

import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { roleValidations } from '../../validation/role.validation'

/**
 * Create role mutation endpoint
 *
 * @description Protected procedure that creates a new role in the database.
 * Also handles connecting the role to specified permissions.
 * Requires authentication to access.
 *
 * @input {CreateRoleInput} - Object containing role details and optional permission IDs
 * @output {CreateRoleOutput} - Object containing success status, message, and created role data
 *
 * @returns {Promise<CreateRoleOutput>} - Returns a promise that resolves to the created role data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails (used instead of CREATION_ERROR)
 */
export const createRole = protectedProcedure
  .input(roleValidations.createRoleInputSchema)
  .output(roleValidations.createRoleOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      const { permissions: permissionIds, ...roleData } = input

      try {
        const role = await ctx.db.role.create({
          data: {
            ...roleData,
            permissions: permissionIds
              ? {
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
        // Handle potential Prisma errors, e.g., unique constraint violation
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002' // Unique constraint failed
        ) {
          return {
            message: `Role with code '${roleData.code}' or name '${roleData.name}' already exists.`,
            success: false,
            data: null,
          }
        }
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.ROLE?.CREATE_ROLE || 'CREATE_ROLE'),
  )
