import { createTRPCRouter } from '@/packages/trpc/trpc'

import { createPermission } from './services/api.create-permission'
import { deletePermission } from './services/api.delete-permission'
import { getPermissionById } from './services/api.get-permission-by-id'
import { getPermissions } from './services/api.get-permissions'
import { updatePermission } from './services/api.update-permission'

/**
 * Permissions Router
 *
 * @description Central router for all permission-related API endpoints. Provides access to:
 * - Get permissions (paginated with search/filter)
 * - Get permission by ID
 * - Create permission
 * - Update permission
 * - Delete permission
 *
 * @module Permissions
 * @type {TRPCRouter}
 *
 * @example
 * // Example usage in a client component:
 * const { data: permissions } = trpc.permissions.getPermissions.useQuery({ page: 1, limit: 10 });
 * const { mutate: createPermission } = trpc.permissions.createPermission.useMutation();
 */
export const permissionsRouter = createTRPCRouter({
  /**
   * Get Permissions Endpoint
   * @see {@link getPermissions} for implementation details
   */
  getPermissions,

  /**
   * Get Permission By ID Endpoint
   * @see {@link getPermissionById} for implementation details
   */
  getPermissionById,

  /**
   * Create Permission Endpoint
   * @see {@link createPermission} for implementation details
   */
  createPermission,

  /**
   * Update Permission Endpoint
   * @see {@link updatePermission} for implementation details
   */
  updatePermission,

  /**
   * Delete Permission Endpoint
   * @see {@link deletePermission} for implementation details
   */
  deletePermission,
})
