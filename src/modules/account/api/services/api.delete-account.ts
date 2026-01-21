import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { accounts } from '../../validation/account.validation'

/**
 * Delete account mutation endpoint
 *
 * @description Protected procedure that deletes an existing account from the database.
 * Requires authentication to access.
 *
 * @input {DeleteAccountInput} - Object containing the account ID to delete
 * @output {DeleteAccountOutput} - Object containing success status, message, and deleted account data
 *
 * @returns {Promise<DeleteAccountOutput>} - Returns a promise that resolves to the deleted account
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If account with given ID doesn't exist
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {DELETE_ERROR} - If database operation fails
 */
export const deleteAccount = protectedProcedure
  .input(accounts.deleteAccountInputSchema)
  .output(accounts.deleteAccountOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })

      const { id } = input

      // Check if account exists
      const existingAccount = await ctx.db.account.findUnique({
        where: { id },
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

      if (!existingAccount) return NOT_FOUND({ id })

      // Delete account
      const deletedAccount = await ctx.db.account.delete({
        where: { id },
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

      return SUCCESS(deletedAccount)
    }, 'ACCOUNT:DELETE_ACCOUNT'),
  )
