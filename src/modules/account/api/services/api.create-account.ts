import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { accounts } from '../../validation/account.validation'

/**
 * Create account mutation endpoint
 *
 * @description Protected procedure that creates a new account in the database.
 * Requires authentication to access.
 *
 * @input {CreateAccountInput} - Object containing account details (userId, type, provider, etc.)
 * @output {CreateAccountOutput} - Object containing success status, message, and created account data
 *
 * @returns {Promise<CreateAccountOutput>} - Returns a promise that resolves to the created account
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {CREATION_ERROR} - If database operation fails
 */
export const createAccount = protectedProcedure
  .input(accounts.createAccountInputSchema)
  .output(accounts.createAccountOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })

      // Extract required fields
      const { userId, type, provider, providerAccountId } = input

      // Extract optional fields with defaults
      const {
        refresh_token = null,
        access_token = null,
        expires_at = null,
        token_type = null,
        scope = null,
        id_token = null,
        session_state = null,
        refresh_token_expires_in = null,
      } = input

      const createdAccount = await ctx.db.account.create({
        data: {
          userId,
          type,
          provider,
          providerAccountId,
          refresh_token,
          access_token,
          expires_at,
          token_type,
          scope,
          id_token,
          session_state,
          refresh_token_expires_in,
        },
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
      return SUCCESS(createdAccount)
    }, 'ACCOUNT:CREATE_ACCOUNT'),
  )
