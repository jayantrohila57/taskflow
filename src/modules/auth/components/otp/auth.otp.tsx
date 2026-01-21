'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function TwoFactorAuth() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">{'Two-Factor Authentication'}</CardTitle>
        <CardDescription>{'Enter the 6-digit code from your authenticator app'}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Input
              key={i}
              className="text-center text-lg font-bold"
              maxLength={1}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
        </div>

        <div className="text-muted-foreground text-center text-sm">
          {" Didn't receive a code?"}{' '}
          <Button
            variant="link"
            className="h-auto p-0"
          >
            {'Resend'}
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {'Back'}
        </Button>
        <Button>
          {'Verify'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  )
}
