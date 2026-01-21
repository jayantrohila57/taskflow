import { TAG } from '@/resources/config/tag.config'
import { env } from '@/resources/environment/env'
import { debugError } from '@/lib/utils'
import { createClient } from 'redis'

const client = createClient({
  username: env.REDIS_USERNAME,
  password: env.REDIS_PASSWORD,
  socket: {
    host: env.REDIS_SOCKET_HOST,
    port: env.REDIS_SOCKET_PORT,
  },
})

client.on('error', (err) => debugError(TAG.REDIS.ERROR, err))

export const redis = {
  connect: async () => {
    await client.connect()
  },
  get: async (key: string): Promise<string | null> => {
    return (await client.get(key))!
  },
  set: async (key: string, value: string, options?: { EX?: number }): Promise<string | null> => {
    return (await client.set(key, value, options))!
  },
  del: async (key: string): Promise<string> => {
    return Number(await client.del(key)).toString()
  },
  disconnect: async () => {
    await client.disconnect()
  },
}
