import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { projectValidations } from '../../validation/project.validation'

/**
 * Delete project mutation endpoint
 *
 * @description Protected procedure that deletes a project from the database.
 * This is a soft delete operation that sets the deletedAt field.
 * Requires authentication to access.
 *
 * @input {DeleteProjectInput} - Object containing the project ID to delete
 * @output {DeleteProjectOutput} - Object containing success status, message, and deleted project ID
 *
 * @returns {Promise<DeleteProjectOutput>} - Returns a promise that resolves to the deletion confirmation
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If project with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails (used instead of DELETION_ERROR)
 */
export const deleteProject = protectedProcedure
  .input(projectValidations.deleteProjectInputSchema)
  .output(projectValidations.deleteProjectOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      try {
        // Check if project exists
        const existingProject = await ctx.db.project.findUnique({
          where: { id: input.id },
        })

        if (!existingProject) return NOT_FOUND({ projectId: input.id })

        // Soft delete project
        await ctx.db.project.update({
          where: { id: input.id },
          data: {
            deletedAt: new Date(),
            isActive: false,
            isArchived: true, // Typically archive when soft deleting
          },
        })

        return SUCCESS({ id: input.id })
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.PROJECT?.DELETE_PROJECT || 'DELETE_PROJECT'),
  )
