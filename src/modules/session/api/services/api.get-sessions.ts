import { type Prisma } from '@prisma/client'

import { apiUtils, TC } from '@/core/api/api.utils'
import { protectedProcedure } from '@/packages/trpc/trpc'
import { TAG } from '@/resources/config/tag.config'
import { sessionValidations } from '../../validation/session.validation'

/**
 * Get sessions query endpoint
 *
 * @description Protected procedure that retrieves a paginated list of sessions from the database.
 * Supports filtering and searching. Requires authentication to access.
 *
 * @input {GetSessionInput} - Object containing pagination parameters (page, limit), search term, and filters
 * @output {GetSessionOutput} - Object containing success status, message, and paginated session data
 *
 * @returns {Promise<GetSessionOutput>} - Returns a promise that resolves to the paginated session list
 *
 * @throws {UNAUTHORIZE} - If user is not authorized
 * @throws {INVALID_INPUT} - If input validation fails
 * @throws {RETRIEVAL_ERROR} - If database operation fails
 */
export const getSessions = protectedProcedure
  .input(sessionValidations.getSessionInputSchema)
  .output(sessionValidations.getSessionOutputSchema)
  .query(async ({ ctx, input }) =>
    TC(async (tag) => {
      const { UNAUTHORIZE, SUCCESS } = await apiUtils(tag)
      if (!ctx.isAuthorize) return UNAUTHORIZE({ input })
      const { page, limit, search, userId, isActive, isRevoked } = input
      const where: Prisma.SessionWhereInput = {}

      // Apply filters
      if (userId) where.userId = userId
      if (isActive === true) where.endedAt = null
      if (isRevoked !== undefined) where.isRevoked = isRevoked

      if (search) {
        where.OR = [
          { sessionToken: { contains: search, mode: 'insensitive' } },
          { userAgent: { contains: search, mode: 'insensitive' } },
          { ipAddress: { contains: search, mode: 'insensitive' } },
        ]
      }

      const [total, sessionList] = await Promise.all([
        ctx.db.session.count({ where }),
        ctx.db.session.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            sessionToken: true,
            userId: true,
            expires: true,
            ipAddress: true,
            userAgent: true,
            activatedAt: true,
            endedAt: true,
            lastUsedAt: true,
            lastActive: true,
            isRevoked: true,
            revokedAt: true,
            revokedReason: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        }),
      ])

      return SUCCESS({ total, page, limit, items: sessionList })
    }, TAG.SESSION.GET_SESSIONS),
  )
