import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { taskValidations } from '../../validation/task.validation'

/**
 * Get task by ID query endpoint
 *
 * @description Protected procedure that retrieves a single task by its ID from the database.
 * Includes the task's role information. Requires authentication to access.
 *
 * @input {GetTaskByIdInput} - Object containing the task ID to retrieve
 * @output {GetTaskByIdOutput} - Object containing success status, message, and task data
 *
 * @returns {Promise<GetTaskByIdOutput>} - Returns a promise that resolves to the task data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {NOT_FOUND} - If task with specified ID is not found
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getTaskById = protectedProcedure
  .input(taskValidations.getTaskByIdInputSchema)
  .output(taskValidations.getTaskByIdOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, NOT_FOUND, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      try {
        const task = await ctx.db.task.findUnique({
          where: { id: input.id },
          include: { roles: true },
        })

        if (!task) return NOT_FOUND({ taskId: input.id })

        return SUCCESS(task)
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.TASK?.GET_TASK_BY_ID || 'GET_TASK_BY_ID'),
  )
