import { createTRPCRouter } from '@/packages/trpc/trpc'

import { createSession } from './services/api.create-session'
import { deleteSession } from './services/api.delete-session'
import { getSessionById } from './services/api.get-session-by-id'
import { getSessions } from './services/api.get-sessions'
import { updateSession } from './services/api.update-session'

/**
 * Session Router
 *
 * @description Central router for all session-related API endpoints. Provides access to:
 * - Get sessions (paginated with search/filter)
 * - Get session by ID
 * - Create new session
 * - Update session information
 * - Delete session
 *
 * @module Session
 * @type {TRPCRouter}
 *
 * @example
 * // Example usage in a client component:
 * const { data: sessions } = trpc.session.getSessions.useQuery({ page: 1, limit: 10 });
 * const { mutate: createSession } = trpc.session.createSession.useMutation();
 * const { mutate: updateSession } = trpc.session.updateSession.useMutation();
 * const { mutate: deleteSession } = trpc.session.deleteSession.useMutation();
 */
export const sessionRouter = createTRPCRouter({
  /**
   * Get Sessions Endpoint
   * @see {@link getSessions} for implementation details
   */
  getSessions,

  /**
   * Get Session By ID Endpoint
   * @see {@link getSessionById} for implementation details
   */
  getSessionById,

  /**
   * Create Session Endpoint
   * @see {@link createSession} for implementation details
   */
  createSession,

  /**
   * Update Session Endpoint
   * @see {@link updateSession} for implementation details
   */
  updateSession,

  /**
   * Delete Session Endpoint
   * @see {@link deleteSession} for implementation details
   */
  deleteSession,
})
