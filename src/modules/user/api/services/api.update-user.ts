import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { userValidations } from '../../validation/user.validation'

/**
 * Update user mutation endpoint
 *
 * @description Protected procedure that updates user information in the database.
 * Requires authentication and authorization to access.
 *
 * @input {UpdateUserInput} - Object containing user ID and fields to update
 * @output {UpdateUserOutput} - Object containing success status, message, and updated user data
 *
 * @returns {Promise<UpdateUserOutput>} - Returns a promise that resolves to the update result
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const updateUser = protectedProcedure
  .input(userValidations.updateUserInputSchema)
  .output(userValidations.updateUserOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })
      const { id, ...updateData } = input
      const updatedUser = await ctx.db.user.update({
        where: { id },
        data: updateData,
        include: { roles: true },
      })

      // Add organizationLength field to match validation schema
      const userWithOrgLength = {
        ...updatedUser,
        organizationLength: null,
      }

      return SUCCESS(userWithOrgLength)
    }, TAG.USER.UPDATE_USER),
  )
