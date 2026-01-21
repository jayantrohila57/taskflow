import { PrismaClient } from '@prisma/client'

import { env } from '@/resources/environment/env'
import { debugError, debugLog } from '@/lib/utils'

const createPrismaClient = () => {
  return new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'event',
        level: 'error',
      },
      {
        emit: 'event',
        level: 'info',
      },
      {
        emit: 'event',
        level: 'warn',
      },
    ],
  })
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
  db.$on('error', (e) => debugLog('DB:ERROR', e.message))
  db.$on('info', (e) => debugLog('DB:INFO', e.message))
  db.$on('warn', (e) => debugLog('DB:WARN', e.message))
  db.$use(async (params, next) => {
    const before = Date.now()
    try {
      const result = await next(params)
      const after = Date.now()
      debugLog('DB:MIDDLEWARE', {
        query: `${params.model}.${params.action} took ${after - before}ms - transaction used: ${params.runInTransaction ? 'YES' : 'NO'}`,
        arguments: params.args,
      })
      return result as unknown
    } catch (error) {
      const after = Date.now()
      debugError('DB:MIDDLEWARE', {
        query: `${params.model}.${params.action} took ${after - before}ms - transaction used: ${params.runInTransaction ? 'YES' : 'NO'}`,
        arguments: params.args,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      })
      throw error
    }
  })
}
