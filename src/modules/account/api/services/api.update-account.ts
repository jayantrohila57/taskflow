import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { accounts } from '../../validation/account.validation'

/**
 * Update account mutation endpoint
 *
 * @description Protected procedure that updates an existing account in the database.
 * Requires authentication to access.
 *
 * @input {UpdateAccountInput} - Object containing account ID and fields to update
 * @output {UpdateAccountOutput} - Object containing success status, message, and updated account data
 *
 * @returns {Promise<UpdateAccountOutput>} - Returns a promise that resolves to the updated account
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If account with given ID doesn't exist
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {UPDATE_ERROR} - If database operation fails
 */
export const updateAccount = protectedProcedure
  .input(accounts.updateAccountInputSchema)
  .output(accounts.updateAccountOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })

      const { id, ...rest } = input

      // Check if account exists
      const existingAccount = await ctx.db.account.findUnique({
        where: { id },
      })

      if (!existingAccount) return NOT_FOUND({ id })

      // Update account
      const updatedAccount = await ctx.db.account.update({
        where: { id },
        data: rest,
        select: {
          id: true,
          userId: true,
          type: true,
          provider: true,
          providerAccountId: true,
          refresh_token: true,
          access_token: true,
          expires_at: true,
          token_type: true,
          scope: true,
          id_token: true,
          session_state: true,
          refresh_token_expires_in: true,
        },
      })

      return SUCCESS(updatedAccount)
    }, 'ACCOUNT:UPDATE_ACCOUNT'),
  )
