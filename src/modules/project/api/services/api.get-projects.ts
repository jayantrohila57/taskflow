import type { Prisma } from '@prisma/client'

import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { projectValidations } from '../../validation/project.validation'

/**
 * Get projects query endpoint
 *
 * @description Protected procedure that retrieves projects from the database.
 * Includes pagination, search, and filter functionality. Requires authentication to access.
 *
 * @input {GetProjectInput} - Object containing pagination, search, and filter parameters
 * @output {GetProjectOutput} - Object containing success status, message, and project data
 *
 * @returns {Promise<GetProjectOutput>} - Returns a promise that resolves to the projects data
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getProjects = protectedProcedure
  .input(projectValidations.getProjectInputSchema)
  .output(projectValidations.getProjectOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS, RETRIEVAL_ERROR } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE()

      const { page = 1, limit = 10, search, filters } = input
      const skip = (page - 1) * limit

      try {
        // Build where conditions based on search and filters
        const where: Prisma.ProjectWhereInput = {}

        if (search) {
          where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { code: { contains: search, mode: 'insensitive' } },
            { slug: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ]
        }

        if (filters) {
          if (filters.name) {
            where.name = { contains: filters.name, mode: 'insensitive' }
          }
          if (filters.slug) {
            where.slug = { contains: filters.slug, mode: 'insensitive' }
          }
          if (filters.code) {
            where.code = { contains: filters.code, mode: 'insensitive' }
          }
          if (filters.priority !== undefined) {
            where.priority = filters.priority
          }
          if (filters.organizationId) {
            where.organizationId = filters.organizationId
          }
          if (filters.statusId) {
            where.statusId = filters.statusId
          }
          if (filters.typeId) {
            where.typeId = filters.typeId
          }
          if (filters.categoryId) {
            where.categoryId = filters.categoryId
          }
        }

        // Get total count
        const total = await ctx.db.project.count({ where })

        // Get paginated projects
        const projects = await ctx.db.project.findMany({
          where,
          include: {
            roles: {
              include: {
                permissions: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        })

        // Format projects to match schema
        const formattedProjects = projects.map((project) => ({
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
        }))

        return SUCCESS({
          total,
          page,
          limit,
          items: formattedProjects,
        })
      } catch (error) {
        return RETRIEVAL_ERROR(error)
      }
    }, TAG.PROJECT?.GET_PROJECTS || 'GET_PROJECTS'),
  )
