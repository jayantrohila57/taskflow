import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { accounts } from '../../validation/account.validation'

/**
 * Get account by ID query endpoint
 *
 * @description Protected procedure that retrieves a specific account by its ID from the database.
 * Requires authentication to access.
 *
 * @input {GetAccountByIdInput} - Object containing the account ID
 * @output {GetAccountByIdOutput} - Object containing success status, message, and account data
 *
 * @returns {Promise<GetAccountByIdOutput>} - Returns a promise that resolves to the found account
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If account with given ID doesn't exist
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getAccountById = protectedProcedure
  .input(accounts.getAccountByIdInputSchema)
  .output(accounts.getAccountByIdOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })

      const { id } = input
      const account = await ctx.db.account.findUnique({
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

      if (!account) return NOT_FOUND({ id })
      return SUCCESS(account)
    }, 'ACCOUNT:GET_ACCOUNT_BY_ID'),
  )
