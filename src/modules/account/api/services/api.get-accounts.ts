import { Prisma } from '@prisma/client'

import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { accounts } from '../../validation/account.validation'

/**
 * Get accounts query endpoint
 *
 * @description Protected procedure that retrieves a paginated list of accounts from the database.
 * Requires authentication to access.
 *
 * @input {GetAccountInput} - Object containing pagination options (page, limit, search)
 * @output {GetAccountOutput} - Object containing success status, message, and accounts data
 *
 * @returns {Promise<GetAccountOutput>} - Returns a promise that resolves to a paginated list of accounts
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getAccounts = protectedProcedure
  .input(accounts.getAccountInputSchema)
  .output(accounts.getAccountOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })

      const { page = 1, limit = 10, search = '', userId } = input
      const skip = (page - 1) * limit

      const where: Prisma.AccountWhereInput = {}

      // Add search filter if search term provided
      if (search) {
        where.OR = [
          {
            provider: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            type: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ]
      }

      // Add userId filter if provided
      if (userId) {
        where.userId = userId
      }

      const [total, accountsList] = await Promise.all([
        ctx.db.account.count({ where }),
        ctx.db.account.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            provider: 'asc',
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
        }),
      ])

      return SUCCESS({
        total,
        page,
        limit,
        accounts: accountsList,
      })
    }, 'ACCOUNT:GET_ACCOUNTS'),
  )
