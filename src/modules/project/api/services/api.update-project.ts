import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { projectValidations } from '../../validation/project.validation'

/**
 * Update project mutation endpoint
 *
 * @description Protected procedure that updates an existing project in the database.
 * Requires authentication to access.
 *
 * @input {UpdateProjectInput} - Object containing project ID and fields to be updated
 * @output {UpdateProjectOutput} - Object containing success status, message, and updated project data
 *
 * @returns {Promise<UpdateProjectOutput>} - Returns a promise that resolves to the updated project data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If project with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails (used instead of UPDATE_ERROR)
 */
export const updateProject = protectedProcedure
  .input(projectValidations.updateProjectInputSchema)
  .output(projectValidations.updateProjectOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      const { id, ...updateData } = input

      try {
        // Check if project exists
        const existingProject = await ctx.db.project.findUnique({
          where: { id },
        })

        if (!existingProject) return NOT_FOUND({ projectId: id })

        // Update project
        const updatedProject = await ctx.db.project.update({
          where: { id },
          data: {
            ...updateData,
            // Explicitly handle potentially null Json fields from Zod defaults
            metadata: updateData.metadata ?? undefined,
            featureFlags: updateData.featureFlags ?? undefined,
          },
          include: {
            roles: {
              include: {
                permissions: true,
              },
            },
          },
        })

        // Format project to match schema
        const formattedProject = {
          ...updatedProject,
          description: updatedProject.description || '',
          metadata: updatedProject.metadata ? JSON.parse(JSON.stringify(updatedProject.metadata)) : {},
          featureFlags: updatedProject.featureFlags ? JSON.parse(JSON.stringify(updatedProject.featureFlags)) : {},
          color: updatedProject.color || '#000000',
          icon: updatedProject.icon || '',
          statusId: updatedProject.statusId || null,
          typeId: updatedProject.typeId || null,
          categoryId: updatedProject.categoryId || null,
          createdBy: updatedProject.createdBy || null,
          updatedBy: updatedProject.updatedBy || null,
        }

        return SUCCESS(formattedProject)
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.PROJECT?.UPDATE_PROJECT || 'UPDATE_PROJECT'),
  )
