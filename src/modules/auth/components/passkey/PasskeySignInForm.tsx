'use client'

import { useTranslations, type Messages } from 'next-intl'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Loader, KeyRound } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { PATH } from '@/resources/config/routes.config'
import { Link } from '@/packages/next-intl/utils/navigation'

export function PasskeySignInForm() {
  const t = useTranslations()
  const [isPending, startTransition] = useTransition()
  const [email, setEmail] = useState('') // Optional: if you ask for email first
  const [showEmailInput, setShowEmailInput] = useState(true) // Control visibility

  const handlePasskeyLogin = () => {
    startTransition(async () => {
      toast.info('Passkey login not fully implemented yet.')
      // 1. Call await generatePasskeyLoginOptions({ email: email || undefined });
      //    - This action should store the challenge (e.g., in an HttpOnly cookie or server session).
      //    - It should return the options for startAuthentication.
      // const options = await generatePasskeyLoginOptions(email || undefined);

      // 2. let assertion;
      //    try {
      //      assertion = await startAuthentication(options);
      //    } catch (error) {
      //      console.error(error);
      //      toast.error(t("PASSKEY_ERROR_CANCELLED") || "Passkey challenge cancelled or failed.");
      //      return;
      //    }

      // 3. Call await verifyPasskeyLogin({ assertion, email: email || undefined });
      //    - This action retrieves the stored challenge to verify.
      //    - If successful, it signs the user in (e.g., using next-auth signIn).
      //    - Returns success/error.
      // const verificationResult = await verifyPasskeyLogin({ assertion, email: email || undefined });
      // if (verificationResult.success) {
      //   toast.success(t("PASSKEY_SIGNIN_SUCCESS") || "Signed in with Passkey!");
      //   // router.push(PATH.ROOT); // Or appropriate redirect
      // } else {
      //   toast.error(verificationResult.message || t("PASSKEY_SIGNIN_FAILED"));
      // }
      setShowEmailInput(false) // Example: hide email input after attempt
    })
  }

  return (
    <div className="space-y-6">
      {showEmailInput && (
        <div className="space-y-2">
          <Label htmlFor="email-passkey">{t('AUTH.EMAIL_LABEL_OPTIONAL_PASSKEY')}</Label>
          <Input
            id="email-passkey"
            type="email"
            placeholder={t('AUTH.EMAIL_PLACEHOLDER')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />
          <p className="text-muted-foreground text-sm">{t('AUTH.PASSKEY_EMAIL_INFO')}</p>
        </div>
      )}
      <Button
        onClick={handlePasskeyLogin}
        disabled={isPending}
        className="w-full"
      >
        {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
        {t('AUTH.PASSKEY_SIGNIN_BUTTON')}
      </Button>
      <div className="text-center text-sm">
        <Link
          href={{ pathname: PATH.PUBLIC.AUTH.SIGN_IN }}
          className="hover:text-primary"
        >
          {t('AUTH.OTHER_SIGNIN_OPTIONS_LINK')}
        </Link>
      </div>
    </div>
  )
}
