import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { roleValidations } from '../../validation/role.validation'

/**
 * Get role by ID query endpoint
 *
 * @description Protected procedure that retrieves a single role by its ID from the database.
 * Includes the role's permission information. Requires authentication to access.
 *
 * @input {GetRoleByIdInput} - Object containing the role ID to retrieve
 * @output {GetRoleByIdOutput} - Object containing success status, message, and role data
 *
 * @returns {Promise<GetRoleByIdOutput>} - Returns a promise that resolves to the role data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If role with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getRoleById = protectedProcedure
  .input(roleValidations.getRoleByIdInputSchema)
  .output(roleValidations.getRoleByIdOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      try {
        const role = await ctx.db.role.findUnique({
          where: { id: input.id },
          include: { permissions: { include: { permission: true } } },
        })

        if (!role) return NOT_FOUND({ roleId: input.id })

        return SUCCESS(role)
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.ROLE?.GET_ROLE_BY_ID || 'GET_ROLE_BY_ID'),
  )
