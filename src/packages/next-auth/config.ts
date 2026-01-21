import { PrismaAdapter } from '@auth/prisma-adapter'
import { type NextAuthConfig } from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import Passkey from 'next-auth/providers/passkey'

import { db } from '@/packages/prisma/db'
import { PATH } from '@/resources/config/routes.config'
import { TAG } from '@/resources/config/tag.config'
import { env } from '@/resources/environment/env'
import { debugError, debugLog, debugWarn } from '@/lib/utils'
import { headers } from 'next/headers'
import { verifyPassword } from './utils'

declare module 'next-auth' {
  interface Session {
    sessionToken: string
    expires: string
    user: {
      userId: string
      name: string
      email: string
      image: string
    }
  }
}

// Auth providers configuration
export const authProviders: NextAuthConfig['providers'] = [
  GithubProvider,
  Passkey,
  Credentials({
    async authorize(credentials) {
      debugLog(TAG.NEXT_AUTH.CREDENTIALS.AUTHORIZE_START)
      if (!credentials) {
        debugLog(TAG.NEXT_AUTH.CREDENTIALS.MISSING_CREDENTIALS)
        return null
      }
      const { email, password } = credentials
      if (!email || !password) {
        debugLog(TAG.NEXT_AUTH.CREDENTIALS.INVALID_CREDENTIALS, {
          email: !!email,
          password: !!password,
        })
        return null
      }
      debugLog(TAG.NEXT_AUTH.CREDENTIALS.FINDING_USER, { email })
      const user = await db.user.findUnique({
        where: { email: email as string },
      })
      if (!user?.hashedPassword) {
        debugLog(TAG.NEXT_AUTH.CREDENTIALS.NO_PASSWORD, { userId: user?.id })
        return null
      }
      debugLog(TAG.NEXT_AUTH.CREDENTIALS.VERIFYING_PASSWORD, {
        userId: user.id,
      })
      const isValid = await verifyPassword(user.hashedPassword, password)
      if (!isValid) {
        debugLog(TAG.NEXT_AUTH.CREDENTIALS.INVALID_PASSWORD, {
          userId: user.id,
        })
        return null
      }
      debugLog(TAG.NEXT_AUTH.CREDENTIALS.AUTHORIZE_SUCCESS, {
        userId: user.id,
      })
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      }
    },
  }),
]

// Auth adapter configuration
export const authAdapter: Adapter = PrismaAdapter(db)

// Custom pages configuration
export const authPages: NextAuthConfig['pages'] = {
  signIn: PATH.PUBLIC.AUTH.SIGN_IN,
  signOut: PATH.PUBLIC.AUTH.SIGN_IN,
  newUser: PATH.PUBLIC.AUTH.SIGN_UP,
  error: PATH.PUBLIC.AUTH.SIGN_IN,
  verifyRequest: PATH.PUBLIC.AUTH.SIGN_IN,
}

// Debug logger configuration
export const authLogger: NextAuthConfig['logger'] = {
  error(code, ...message) {
    debugError(TAG.NEXT_AUTH.ERROR, { code, message })
  },
  warn(code, ...message) {
    debugWarn(TAG.NEXT_AUTH.WARN, { code, message })
  },
  debug(code, ...message) {
    debugLog(TAG.NEXT_AUTH.DEBUG, { code, message })
  },
}

// Auth event handlers
export const authEvents: NextAuthConfig['events'] = {
  signIn: async ({ account, user, isNewUser }) => {
    debugLog(TAG.NEXT_AUTH.EVENT.SIGNIN.START)
    try {
      if (account?.provider && user?.id) {
        const headersList = await headers()
        const [userAgent, ipAddress] = await Promise.all([
          headersList.get('user-agent'),
          headersList.get('x-forwarded-for'),
        ])
        debugLog(TAG.NEXT_AUTH.EVENT.SIGNIN.HEADERS)
        if (isNewUser) {
          debugLog(TAG.NEXT_AUTH.EVENT.SIGNIN.NEW_USER, { userId: user.id })
          await db.session.update({
            where: { id: user.id },
            data: {
              activatedAt: new Date(),
              lastUsedAt: new Date(),
              lastActive: new Date(),
            },
          })
        }
        const updatePromises = [
          db.session.updateMany({
            where: {
              userId: user.id,
            },
            data: {
              activatedAt: new Date(),
              userAgent,
              ipAddress,
              lastUsedAt: new Date(),
              lastActive: new Date(),
            },
          }),
        ]
        await Promise.all(updatePromises)
        debugLog(TAG.NEXT_AUTH.EVENT.SIGNIN.UPDATES_COMPLETE)
      } else {
        debugWarn(TAG.NEXT_AUTH.EVENT.SIGNIN.MISSING_DATA, {
          hasAccount: !!account,
          hasUser: !!user,
          hasProvider: account?.provider,
          hasUserId: user?.id,
        })
      }
    } catch (error) {
      debugError(TAG.NEXT_AUTH.EVENT.SIGNIN.ERROR, error)
      throw error
    }
    debugLog(TAG.NEXT_AUTH.EVENT.SIGNIN.COMPLETE)
  },
  signOut: async (message) => {
    debugLog(TAG.NEXT_AUTH.EVENT.SIGNOUT, message)
    if ('session' in message && message.session?.userId) {
      const now = new Date()
      await db.session.updateMany({
        where: {
          userId: message.session?.userId,
          endedAt: null,
        },
        data: {
          endedAt: now,
          lastUsedAt: now,
          lastActive: now,
        },
      })
    }
  },
  createUser: async ({ user }) => {
    debugLog(TAG.NEXT_AUTH.EVENT.CREATE_USER, { user })
  },
  linkAccount: async ({ account, user, profile }) => {
    debugLog(TAG.NEXT_AUTH.EVENT.ACCOUNT_LINK, { account, user, profile })
    if (account.provider === 'github' && profile && 'avatar_url' in profile && user?.id) {
      debugLog(TAG.NEXT_AUTH.EVENT.ACCOUNT_LINK, {
        provider: account.provider,
      })
    }
  },
  updateUser: async (message) => {
    debugLog(TAG.NEXT_AUTH.EVENT.USER_UPDATED, message)
  },
  session: async (message) => {
    debugLog(TAG.NEXT_AUTH.EVENT.SESSION, message)
    return Promise.resolve()
  },
}

// Auth callbacks
export const authCallbacks: NextAuthConfig['callbacks'] = {
  async session({ session, user }) {
    return {
      sessionToken: session?.sessionToken,
      expires: session?.expires,
      user: {
        userId: user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      },
    }
  },
}

// Main auth configuration
export const authConfig: NextAuthConfig = {
  providers: authProviders,
  adapter: authAdapter,
  trustHost: true,
  pages: authPages,
  debug: env?.NODE_ENV === 'development',
  experimental: { enableWebAuthn: true },
  logger: authLogger,
  events: authEvents,
  callbacks: authCallbacks,
} satisfies NextAuthConfig
