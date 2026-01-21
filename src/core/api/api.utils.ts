import { getTranslations } from 'next-intl/server'
import { z } from 'zod'

import { debugError, debugLog } from '@/lib/utils'

export const apiUtils = async (tag: string) => {
  const t = await getTranslations()
  return {
    UNAUTHORIZE: (...arg: unknown[]) => {
      debugLog(`API:${tag}:UNAUTHORIZE`, 'Unauthorized access attempt to endpoint', arg)
      return {
        message: t('API.UNAUTHORIZE', { tag }),
        success: false,
        data: null,
      }
    },
    NOT_FOUND: (...arg: unknown[]) => {
      debugLog(`API:${tag}:NOT_FOUND`, 'Requested resource not found', arg)
      return {
        message: t('API.NOT_FOUND'),
        success: false,
        data: null,
      }
    },
    SUCCESS: <T>(data: T) => {
      debugLog(`API:${tag}:SUCCESS`, data)
      return {
        message: t('API.SUCCESS'),
        success: true,
        data,
      }
    },
    INVALID_INPUT: (error: unknown) => {
      debugError(`API:${tag}:INVALID_INPUT`, 'Invalid input provided', error)
      return {
        message: t('API.INVALID_INPUT', {
          error: error instanceof Error ? error.message : 'Invalid input',
        }),
        success: false,
        data: null,
      }
    },
    RETRIEVAL_ERROR: (error: unknown) => {
      debugError(`API:${tag}:RETRIEVAL_ERROR`, 'Failed to retrieve data', error)
      return {
        message: t('API.RETRIEVAL_ERROR'),
        success: false,
        data: null,
      }
    },
    VALIDATION_ERROR: (error: unknown) => {
      debugError(`API:${tag}:VALIDATION_ERROR`, 'Validation failed', error)
      return {
        message: t('API.VALIDATION_ERROR', {
          error: error instanceof Error ? error.message : 'Validation failed',
        }),
        success: false,
        data: null,
      }
    },
    CONFLICT: (...arg: unknown[]) => {
      debugLog(`API:${tag}:CONFLICT`, 'Resource conflict detected', arg)
      return {
        message: t('API.CONFLICT'),
        success: false,
        data: null,
      }
    },
    FORBIDDEN: (...arg: unknown[]) => {
      debugLog(`API:${tag}:FORBIDDEN`, 'Forbidden access attempt', arg)
      return {
        message: t('API.FORBIDDEN'),
        success: false,
        data: null,
      }
    },
  }
}

/**
 * Executes an asynchronous callback with a given tag and handles errors using utility functions.
 *
 * @template T - The return type of the callback.
 * @param cb - An asynchronous callback function that takes a tag and returns a Promise of type T.
 * @param tag - A string identifier used for retrieving utility functions and passed to the callback.
 * @returns A Promise resolving to the result of the callback, or an error response from utility functions.
 *
 * @remarks
 * - If the callback throws a `z.ZodError`, the `INVALID_INPUT` utility is used to handle the error.
 * - For all other errors, the `RETRIEVAL_ERROR` utility is used.
 */
export const TC = async <T>(cb: (tag: string) => Promise<T>, tag: string) => {
  const utils = await apiUtils(tag)
  try {
    return await cb(tag)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return utils.INVALID_INPUT(error)
    }
    return utils.RETRIEVAL_ERROR(error)
  }
}
