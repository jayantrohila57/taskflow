import { createTRPCRouter } from '@/packages/trpc/trpc'

import { createRole } from './services/api.create-role'
import { deleteRole } from './services/api.delete-role'
import { getRoleById } from './services/api.get-role-by-id'
import { getRoles } from './services/api.get-roles'
import { updateRole } from './services/api.update-role'

/**
 * Roles Router
 *
 * @description Central router for all role-related API endpoints. Provides access to:
 * - Get roles (paginated with search/filter)
 * - Get role by ID
 * - Create role
 * - Update role
 * - Delete role
 *
 * @module Roles
 * @type {TRPCRouter}
 *
 * @example
 * // Example usage in a client component:
 * const { data: roles } = trpc.roles.getRoles.useQuery({ page: 1, limit: 10 });
 * const { mutate: createRole } = trpc.roles.createRole.useMutation();
 */
export const rolesRouter = createTRPCRouter({
  /**
   * Get Roles Endpoint
   * @see {@link getRoles} for implementation details
   */
  getRoles,

  /**
   * Get Role By ID Endpoint
   * @see {@link getRoleById} for implementation details
   */
  getRoleById,

  /**
   * Create Role Endpoint
   * @see {@link createRole} for implementation details
   */
  createRole,

  /**
   * Update Role Endpoint
   * @see {@link updateRole} for implementation details
   */
  updateRole,

  /**
   * Delete Role Endpoint
   * @see {@link deleteRole} for implementation details
   */
  deleteRole,
})
