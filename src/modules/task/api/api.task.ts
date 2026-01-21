import { createTRPCRouter } from '@/packages/trpc/trpc'

import { createTask } from './services/api.create-task'
import { deleteTask } from './services/api.delete-task'
import { getTaskById } from './services/api.get-task-by-id'
import { getTasks } from './services/api.get-tasks'
import { updateTask } from './services/api.update-task'

/**
 * Tasks Router
 *
 * @description Central router for all task-related API endpoints. Provides access to:
 * - Get tasks (paginated with search/filter)
 * - Get task by ID
 * - Create task
 * - Update task
 * - Delete task
 *
 * @module Tasks
 * @type {TRPCRouter}
 *
 * @example
 * // Example usage in a client component:
 * const { data: tasks } = trpc.tasks.getTasks.useQuery({ page: 1, limit: 10 });
 * const { mutate: createTask } = trpc.tasks.createTask.useMutation();
 */
export const tasksRouter = createTRPCRouter({
  /**
   * Get Tasks Endpoint
   * @see {@link getTasks} for implementation details
   */
  getTasks,

  /**
   * Get Task By ID Endpoint
   * @see {@link getTaskById} for implementation details
   */
  getTaskById,

  /**
   * Create Task Endpoint
   * @see {@link createTask} for implementation details
   */
  createTask,

  /**
   * Update Task Endpoint
   * @see {@link updateTask} for implementation details
   */
  updateTask,

  /**
   * Delete Task Endpoint
   * @see {@link deleteTask} for implementation details
   */
  deleteTask,
})
