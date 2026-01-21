import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { taskValidations } from '../../validation/task.validation'

/**
 * Delete task mutation endpoint
 *
 * @description Protected procedure that deletes a task from the database.
 * This is a soft delete operation that sets the deletedAt field.
 * Requires authentication to access.
 *
 * @input {DeleteTaskInput} - Object containing the task ID to delete
 * @output {DeleteTaskOutput} - Object containing success status, message, and deleted task ID
 *
 * @returns {Promise<DeleteTaskOutput>} - Returns a promise that resolves to the deletion confirmation
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If task with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const deleteTask = protectedProcedure
  .input(taskValidations.deleteTaskInputSchema)
  .output(taskValidations.deleteTaskOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      try {
        // Check if task exists
        const existingTask = await ctx.db.task.findUnique({
          where: { id: input.id },
        })

        if (!existingTask) return NOT_FOUND({ taskId: input.id })

        // Soft delete task
        await ctx.db.task.update({
          where: { id: input.id },
          data: {
            deletedAt: new Date(),
            isActive: false,
          },
        })

        return SUCCESS({ id: input.id })
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.TASK?.DELETE_TASK || 'DELETE_TASK'),
  )
