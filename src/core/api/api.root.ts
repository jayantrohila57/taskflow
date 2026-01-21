import { accountRouter } from '@/modules/account/api/api.account'
import { organizationRouter } from '@/modules/organization/api/api.organization'
import { permissionsRouter } from '@/modules/permissions/api/api.permission'
import { projectsRouter } from '@/modules/project/api/api.project'
import { rolesRouter } from '@/modules/role/api/api.role'
import { sessionRouter } from '@/modules/session/api/api.session'
import { tasksRouter } from '@/modules/task/api/api.task'
import { teamsRouter } from '@/modules/team/api/api.team'
import { usersRouter } from '@/modules/user/api/api.user'
import { createCallerFactory, createTRPCRouter } from '@/packages/trpc/trpc'

/**
 * Main Application Router
 *
 * @description Central router that combines all feature-specific routers into a single API endpoint.
 * Provides access to all application features through a unified interface.
 *
 * @module AppRouter
 * @type {TRPCRouter}
 *
 * @property {TRPCRouter} user - User management endpoints
 * @property {TRPCRouter} organization - Organization management endpoints
 * @property {TRPCRouter} task - Task management endpoints
 * @property {TRPCRouter} project - Project management endpoints
 * @property {TRPCRouter} role - Role management endpoints
 * @property {TRPCRouter} permission - Permission management endpoints
 * @property {TRPCRouter} team - Team management endpoints
 * @property {TRPCRouter} session - Session management endpoints
 * @property {TRPCRouter} account - Account management endpoints
 *
 * @example
 * // Example usage in a client component:
 * const { data: user } = trpc.user.getUser.useQuery();
 * const { mutate: createTask } = trpc.task.createTask.useMutation();
 */
export const appRouter = createTRPCRouter({
  user: usersRouter,
  role: rolesRouter,
  permission: permissionsRouter,
  session: sessionRouter,
  account: accountRouter,
  organization: organizationRouter,
  task: tasksRouter,
  project: projectsRouter,
  team: teamsRouter,
})

/**
 * Type representing the main application router
 *
 * @description This type is used for type safety and inference throughout the application.
 * It represents the complete structure of the application's API endpoints.
 *
 * @type {AppRouter}
 */
export type AppRouter = typeof appRouter

/**
 * Creates a caller function for the application router
 *
 * @description This function generates a type-safe caller that can be used to invoke
 * API endpoints directly from server-side code.
 *
 * @returns {Function} - A caller function that can invoke API endpoints
 *
 * @example
 * const caller = createCaller();
 * const user = await caller.user.getUser({ id: '123' });
 */
export const createCaller = createCallerFactory(appRouter)
