import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { projectValidations } from '../../validation/project.validation'

/**
 * Get project by ID query endpoint
 *
 * @description Protected procedure that retrieves a single project by its ID from the database.
 * Includes the project's role information. Requires authentication to access.
 *
 * @input {GetProjectByIdInput} - Object containing the project ID to retrieve
 * @output {GetProjectByIdOutput} - Object containing success status, message, and project data
 *
 * @returns {Promise<GetProjectByIdOutput>} - Returns a promise that resolves to the project data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If project with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getProjectById = protectedProcedure
  .input(projectValidations.getProjectByIdInputSchema)
  .output(projectValidations.getProjectByIdOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      try {
        const project = await ctx.db.project.findUnique({
          where: { id: input.id },
          include: {
            roles: {
              include: {
                permissions: true,
              },
            },
          },
        })

        if (!project) return NOT_FOUND({ projectId: input.id })

        // Ensure required fields are not null
        const formattedProject = {
          ...project,
          description: project.description || '',
          metadata: project.metadata ? JSON.parse(JSON.stringify(project.metadata)) : {},
          featureFlags: project.featureFlags ? JSON.parse(JSON.stringify(project.featureFlags)) : {},
          color: project.color || '#000000',
          icon: project.icon || '',
          statusId: project.statusId || null,
          typeId: project.typeId || null,
          categoryId: project.categoryId || null,
          createdBy: project.createdBy || null,
          updatedBy: project.updatedBy || null,
        }

        return SUCCESS(formattedProject)
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.PROJECT?.GET_PROJECT_BY_ID || 'GET_PROJECT_BY_ID'),
  )
