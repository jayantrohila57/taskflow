import { createTRPCRouter } from '@/packages/trpc/trpc'

import { createAccount } from './services/api.create-account'
import { deleteAccount } from './services/api.delete-account'
import { getAccountById } from './services/api.get-account-by-id'
import { getAccountByUserId } from './services/api.get-account-by-user-id'
import { getAccounts } from './services/api.get-accounts'
import { updateAccount } from './services/api.update-account'

/**
 * Account Router
 *
 * @description Central router for all account-related API endpoints. Provides access to:
 * - Get accounts
 * - Get account by ID
 * - Get accounts by user ID
 * - Create new account
 * - Update account
 * - Delete account
 *
 * @module Account
 * @type {TRPCRouter}
 *
 * @example
 * // Example usage in a client component:
 * const { data: accounts } = trpc.account.get.useQuery();
 * const { data: userAccounts } = trpc.account.getByUserId.useQuery({ userId: 'user-id' });
 * const { mutate: createAccount } = trpc.account.create.useMutation();
 * const { mutate: updateAccount } = trpc.account.update.useMutation();
 * const { mutate: deleteAccount } = trpc.account.delete.useMutation();
 */
export const accountRouter = createTRPCRouter({
  get: getAccounts,
  getById: getAccountById,
  getByUserId: getAccountByUserId,
  create: createAccount,
  update: updateAccount,
  delete: deleteAccount,
})
