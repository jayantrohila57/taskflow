import type { Row } from '@tanstack/react-table'
import { CheckCircle, Info, ShieldAlert, ShieldCheck, XCircle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { UserTypes } from '../../../validation/user.validation'

// Assuming literals are defined elsewhere and passed or imported
const literals = {
  security: {
    twoFactorEnabled: '2FA Enabled',
    twoFactorDisabled: '2FA Disabled',
    verified: 'Email Verified',
    unverified: 'Email Unverified',
    attempts: (count: number) => `${count} failed login ${count === 1 ? 'attempt' : 'attempts'}`,
    noAttempts: 'No failed login attempts',
  },
}

interface SecurityCellProps {
  row: Row<UserTypes['UserWithRole']>
}

export function SecurityCell({ row }: SecurityCellProps) {
  const user = row.original
  const twoFactorEnabled = user.twoFactorEnabled ?? false
  const emailVerified = user.emailVerified != null
  const failedAttempts = user.failedLoginAttempts ?? 0

  return (
    <div className="flex flex-col space-y-1">
      <TooltipProvider delayDuration={100}>
        {/* 2FA Status Badge with Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant={twoFactorEnabled ? 'default' : 'secondary'}
              className="w-fit"
            >
              {twoFactorEnabled ? (
                <ShieldCheck className="mr-1 h-3.5 w-3.5" />
              ) : (
                <ShieldAlert className="mr-1 h-3.5 w-3.5" />
              )}
              {twoFactorEnabled ? literals.security.twoFactorEnabled : literals.security.twoFactorDisabled}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{twoFactorEnabled ? literals.security.twoFactorEnabled : literals.security.twoFactorDisabled}</p>
          </TooltipContent>
        </Tooltip>

        {/* Email Verification Status Badge with Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant={emailVerified ? 'default' : 'secondary'}
              className="w-fit"
            >
              {emailVerified ? <CheckCircle className="mr-1 h-3.5 w-3.5" /> : <XCircle className="mr-1 h-3.5 w-3.5" />}
              {emailVerified ? literals.security.verified : literals.security.unverified}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{emailVerified ? literals.security.verified : literals.security.unverified}</p>
          </TooltipContent>
        </Tooltip>

        {/* Failed Login Attempts Tooltip */}
        {failedAttempts > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="destructive"
                className="w-fit"
              >
                <Info className="mr-1 h-3.5 w-3.5" />
                {literals.security.attempts(failedAttempts)}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{literals.security.attempts(failedAttempts)}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  )
}
