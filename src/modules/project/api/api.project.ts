import { createTRPCRouter } from '@/packages/trpc/trpc'

import { createProject } from './services/api.create-project'
import { deleteProject } from './services/api.delete-project'
import { getProjectById } from './services/api.get-project-by-id'
import { getProjects } from './services/api.get-projects'
import { updateProject } from './services/api.update-project'

/**
 * Projects Router
 *
 * @description Central router for all project-related API endpoints. Provides access to:
 * - Get projects (paginated with search/filter)
 * - Get project by ID
 * - Create project
 * - Update project
 * - Delete project
 *
 * @module Projects
 * @type {TRPCRouter}
 *
 * @example
 * // Example usage in a client component:
 * const { data: projects } = trpc.projects.getProjects.useQuery({ page: 1, limit: 10 });
 * const { mutate: createProject } = trpc.projects.createProject.useMutation();
 */
export const projectsRouter = createTRPCRouter({
  /**
   * Get Projects Endpoint
   * @see {@link getProjects} for implementation details
   */
  getProjects,

  /**
   * Get Project By ID Endpoint
   * @see {@link getProjectById} for implementation details
   */
  getProjectById,

  /**
   * Create Project Endpoint
   * @see {@link createProject} for implementation details
   */
  createProject,

  /**
   * Update Project Endpoint
   * @see {@link updateProject} for implementation details
   */
  updateProject,

  /**
   * Delete Project Endpoint
   * @see {@link deleteProject} for implementation details
   */
  deleteProject,
})
