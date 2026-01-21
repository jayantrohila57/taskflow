import type { Prisma } from '@prisma/client'

import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { taskValidations } from '../../validation/task.validation'

/**
 * Get tasks query endpoint
 *
 * @description Protected procedure that retrieves tasks from the database.
 * Includes pagination, search, and filter functionality. Requires authentication to access.
 *
 * @input {GetTaskInput} - Object containing pagination, search, and filter parameters
 * @output {GetTaskOutput} - Object containing success status, message, and task data
 *
 * @returns {Promise<GetTaskOutput>} - Returns a promise that resolves to the tasks data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getTasks = protectedProcedure
  .input(taskValidations.getTaskInputSchema)
  .output(taskValidations.getTaskOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      const { page = 1, limit = 10, search, filters } = input
      const skip = (page - 1) * limit

      try {
        // Build where conditions based on search and filters
        const where: Prisma.TaskWhereInput = {}

        if (search) {
          where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { code: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ]
        }

        if (filters) {
          if (filters.title) {
            where.title = { contains: filters.title, mode: 'insensitive' }
          }
          if (filters.code) {
            where.code = { contains: filters.code, mode: 'insensitive' }
          }
          if (filters.priority !== undefined) {
            where.priority = filters.priority
          }
          if (filters.projectId) {
            where.projectId = filters.projectId
          }
          if (filters.statusId) {
            where.statusId = filters.statusId
          }
        }

        // Get total count
        const total = await ctx.db.task.count({ where })

        // Get paginated tasks
        const tasks = await ctx.db.task.findMany({
          where,
          include: { roles: true },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        })

        return SUCCESS({
          total,
          page,
          limit,
          items: tasks,
        })
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.TASK?.GET_TASKS || 'GET_TASKS'),
  )
