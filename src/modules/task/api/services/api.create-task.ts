import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { taskValidations } from '../../validation/task.validation'

/**
 * Create task mutation endpoint
 *
 * @description Protected procedure that creates a new task in the database.
 * Requires authentication to access.
 *
 * @input {CreateTaskInput} - Object containing task details to be created
 * @output {CreateTaskOutput} - Object containing success status, message, and created task data
 *
 * @returns {Promise<CreateTaskOutput>} - Returns a promise that resolves to the created task data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const createTask = protectedProcedure
  .input(taskValidations.createTaskInputSchema)
  .output(taskValidations.createTaskOutputSchema)
  .mutation(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      try {
        const task = await ctx.db.task.create({
          data: {
            title: input.title,
            description: input.description,
            code: input.code,
            priority: input.priority,
            isActive: input.isActive,
            dueDate: input.dueDate,
            startDate: input.startDate,
            endDate: input.endDate,
            projectId: input.projectId,
            statusId: input.statusId,
            typeId: input.typeId,
            categoryId: input.categoryId,
            assigneeId: input.assigneeId,
            reporterId: input.reporterId,
            organizationMemberAssigneeId: input.organizationMemberAssigneeId,
            organizationMemberReporterId: input.organizationMemberReporterId,
          },
          include: { roles: true },
        })

        return SUCCESS(task)
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.TASK?.CREATE_TASK || 'CREATE_TASK'),
  )
