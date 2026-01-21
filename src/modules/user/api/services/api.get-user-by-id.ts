import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { userValidations } from '../../validation/user.validation'

/**
 * Get user by ID query endpoint
 *
 * @description Protected procedure that retrieves a single user by their ID from the database.
 * Includes the user's role information. Requires authentication to access.
 *
 * @input {GetUserByIdInput} - Object containing the user ID to retrieve
 * @output {GetUserByIdOutput} - Object containing success status, message, and user data
 *
 * @returns {Promise<GetUserByIdOutput>} - Returns a promise that resolves to the user data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If user with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getUserById = protectedProcedure
  .input(userValidations.getUserByIdInputSchema)
  .output(userValidations.getUserByIdOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ userId: input.id })
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
        include: { roles: true },
      })
      if (!user) return NOT_FOUND({ userId: input.id })

      // Add organizationLength field to match validation schema
      const userWithOrgLength = {
        ...user,
        organizationLength: null,
      }

      return SUCCESS(userWithOrgLength)
    }, TAG.USER.GET_USER_BY_ID),
  )
