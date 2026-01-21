import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { userValidations } from '../../validation/user.validation'

/**
 * Get full user details by ID query endpoint
 *
 * @description Protected procedure that retrieves comprehensive user details by their ID.
 * Includes user's role information and other details. Requires authentication to access.
 *
 * @input {GetUserByIdInput} - Object containing the user ID to retrieve
 * @output {GetFullUserDetailsByIdOutput} - Object containing success status, message, and full user data
 *
 * @returns {Promise<GetFullUserDetailsByIdOutput>} - Returns a promise that resolves to the complete user data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If user with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getFullUserDetailsById = protectedProcedure
  .input(userValidations.getUserByIdInputSchema)
  .output(userValidations.getFullUserDetailsByIdOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ userId: input.id })

      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
        include: {
          roles: true,
          accounts: true,
          sessions: true,
          UserRole: {
            include: {
              role: true,
            },
          },
        },
      })

      if (!user) return NOT_FOUND({ userId: input.id })

      // Create a user object that matches the expected schema exactly
      const userWithOrgLength = {
        ...user,
        organizationLength: null,
      }

      return SUCCESS(userWithOrgLength)
    }, TAG.USER.GET_USER_BY_ID),
  )
