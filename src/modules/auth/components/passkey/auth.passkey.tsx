'use client'

import type { Session } from 'next-auth'
import { signIn } from 'next-auth/webauthn'
import { Button } from '@/components/ui/button'

export default function PassKeyComponent({ session }: { session?: Session | null }) {
  if (session) return null
  return (
    <div className="flex flex-col gap-4">
      <Button
        className="w-full"
        onClick={() => signIn('passkey', { action: 'register' })}
      >
        {'Register new Passkey'}
      </Button>

      <Button
        className="w-full"
        onClick={() => signIn('passkey')}
      >
        {'Sign in with Passkey'}
      </Button>
    </div>
  )
}
