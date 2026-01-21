import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { accounts } from '../../validation/account.validation'

/**
 * Get accounts by user ID query endpoint
 *
 * @description Protected procedure that retrieves all accounts for a specific user from the database.
 * Requires authentication to access.
 *
 * @input {GetAccountByUserIdInput} - Object containing the user ID
 * @output {GetAccountByUserIdOutput} - Object containing success status, message, and accounts data
 *
 * @returns {Promise<GetAccountByUserIdOutput>} - Returns a promise that resolves to the found accounts
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getAccountByUserId = protectedProcedure
  .input(accounts.getAccountByUserIdInputSchema)
  .output(accounts.getAccountByUserIdOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })

      const { userId } = input
      const userAccounts = await ctx.db.account.findMany({
        where: { userId },
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
        orderBy: {
          provider: 'asc',
        },
      })

      return SUCCESS(userAccounts)
    }, 'ACCOUNT:GET_ACCOUNT_BY_USER_ID'),
  )
