import { createTRPCRouter } from '@/packages/trpc/trpc'

import { createTeam } from './services/api.create-team'
import { deleteTeam } from './services/api.delete-team'
import { getTeamById } from './services/api.get-team-by-id'
import { getTeams } from './services/api.get-teams'
import { updateTeam } from './services/api.update-team'

/**
 * Teams Router
 *
 * @description Central router for all team-related API endpoints. Provides access to:
 * - Get teams (paginated with search/filter)
 * - Get team by ID
 * - Create team
 * - Update team
 * - Delete team
 *
 * @module Teams
 * @type {TRPCRouter}
 *
 * @example
 * // Example usage in a client component:
 * const { data: teams } = trpc.teams.getTeams.useQuery({ page: 1, limit: 10 });
 * const { mutate: createTeam } = trpc.teams.createTeam.useMutation();
 */
export const teamsRouter = createTRPCRouter({
  /**
   * Get Teams Endpoint
   * @see {@link getTeams} for implementation details
   */
  getTeams,

  /**
   * Get Team By ID Endpoint
   * @see {@link getTeamById} for implementation details
   */
  getTeamById,

  /**
   * Create Team Endpoint
   * @see {@link createTeam} for implementation details
   */
  createTeam,

  /**
   * Update Team Endpoint
   * @see {@link updateTeam} for implementation details
   */
  updateTeam,

  /**
   * Delete Team Endpoint
   * @see {@link deleteTeam} for implementation details
   */
  deleteTeam,
})
