import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { projectValidations } from '../../validation/project.validation'

/**
 * Create project mutation endpoint
 *
 * @description Protected procedure that creates a new project in the database.
 * Requires authentication to access.
 *
 * @input {CreateProjectInput} - Object containing project details to be created
 * @output {CreateProjectOutput} - Object containing success status, message, and created project data
 *
 * @returns {Promise<CreateProjectOutput>} - Returns a promise that resolves to the created project data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails (used instead of CREATION_ERROR)
 */
export const createProject = protectedProcedure
  .input(projectValidations.createProjectInputSchema)
  .output(projectValidations.createProjectOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      try {
        const project = await ctx.db.project.create({
          data: {
            name: input.name,
            description: input.description || '',
            slug: input.slug,
            metadata: input.metadata ? JSON.parse(JSON.stringify(input.metadata)) : undefined,
            priority: input.priority,
            featureFlags: input.featureFlags ? JSON.parse(JSON.stringify(input.featureFlags)) : undefined,
            code: input.code,
            color: input.color || '#000000',
            icon: input.icon || '', // Ensure icon is never null
            isActive: input.isActive,
            isPrivate: input.isPrivate,
            organizationId: input.organizationId,
            statusId: input.statusId,
            typeId: input.typeId,
            categoryId: input.categoryId,
            createdBy: input.createdBy,
          },
          include: {
            roles: {
              include: {
                permissions: true,
              },
            },
          },
        })

        return SUCCESS({
          ...project,
          description: project.description || '',
          metadata: project.metadata ? JSON.parse(JSON.stringify(project.metadata)) : undefined,
          featureFlags: project.featureFlags ? JSON.parse(JSON.stringify(project.featureFlags)) : undefined,
          color: project.color || '#000000',
          icon: project.icon || '', // Ensure icon is never null in response
        })
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.PROJECT?.CREATE_PROJECT || 'CREATE_PROJECT'),
  )
