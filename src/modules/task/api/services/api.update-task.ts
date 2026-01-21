import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { taskValidations } from '../../validation/task.validation'

/**
 * Update task mutation endpoint
 *
 * @description Protected procedure that updates an existing task in the database.
 * Requires authentication to access.
 *
 * @input {UpdateTaskInput} - Object containing task ID and fields to be updated
 * @output {UpdateTaskOutput} - Object containing success status, message, and updated task data
 *
 * @returns {Promise<UpdateTaskOutput>} - Returns a promise that resolves to the updated task data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If task with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {UPDATE_ERROR} - If database operation fails
 */
export const updateTask = protectedProcedure
  .input(taskValidations.updateTaskInputSchema)
  .output(taskValidations.updateTaskOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      const { id, ...updateData } = input

      try {
        // Check if task exists
        const existingTask = await ctx.db.task.findUnique({
          where: { id },
        })

        if (!existingTask) return NOT_FOUND({ taskId: id })

        // Update task
        const updatedTask = await ctx.db.task.update({
          where: { id },
          data: updateData,
          include: { roles: true },
        })

        return SUCCESS(updatedTask)
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.TASK?.UPDATE_TASK || 'UPDATE_TASK'),
  )
