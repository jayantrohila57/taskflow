import { createTRPCRouter } from '@/packages/trpc/trpc'

import { getFullUserDetailsById } from './services/api.get-full-user-details-by-id'
import { getUserById } from './services/api.get-user-by-id'
import { getUsers } from './services/api.get-users'
import { updateUser } from './services/api.update-user'

/**
 * Users Router
 *
 * @description Central router for all user-related API endpoints. Provides access to:
 * - Get users (paginated with search/filter)
 * - Get user by ID
 * - Get full user details by ID
 * - Update user information
 *
 * @module Users
 * @type {TRPCRouter}
 *
 * @example
 * // Example usage in a client component:
 * const { data: users } = trpc.users.getUsers.useQuery({ page: 1, limit: 10 });
 * const { mutate: updateUser } = trpc.users.updateUser.useMutation();
 */
export const usersRouter = createTRPCRouter({
  /**
   * Get Users Endpoint
   * @see {@link getUsers} for implementation details
   */
  getUsers,

  /**
   * Get User By ID Endpoint
   * @see {@link getUserById} for implementation details
   */
  getUserById,

  /**
   * Get Full User Details By ID Endpoint
   * @see {@link getFullUserDetailsById} for implementation details
   */
  getFullUserDetailsById,

  /**
   * Update User Endpoint
   * @see {@link updateUser} for implementation details
   */
  updateUser,
})
