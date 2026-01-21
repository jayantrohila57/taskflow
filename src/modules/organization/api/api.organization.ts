import { createTRPCRouter } from '@/packages/trpc/trpc'

import { createOrganization } from './services/api.create-organization'
import { deleteOrganization } from './services/api.delete-organization'
import { getOrganizationById } from './services/api.get-organization-by-id'
import { getOrganizations } from './services/api.get-organizations'
import { updateOrganization } from './services/api.update-organization'

/**
 * Organization Router
 *
 * @description Central router for all organization-related API endpoints. Provides access to:
 * - Get organizations
 * - Get organization by ID
 * - Create new organization
 * - Update organization
 * - Delete organization
 *
 * @module Organization
 * @type {TRPCRouter}
 *
 * @example
 * // Example usage in a client component:
 * const { data: organizations } = trpc.organization.get.useQuery();
 * const { mutate: createOrganization } = trpc.organization.create.useMutation();
 * const { mutate: updateOrganization } = trpc.organization.update.useMutation();
 * const { mutate: deleteOrganization } = trpc.organization.delete.useMutation();
 */
export const organizationRouter = createTRPCRouter({
  get: getOrganizations,
  getById: getOrganizationById,
  create: createOrganization,
  update: updateOrganization,
  delete: deleteOrganization,
})
