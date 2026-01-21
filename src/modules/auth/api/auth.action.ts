'use server'

import bcrypt from 'bcryptjs'
import { signIn, signOut } from '@/packages/next-auth'
import { SignUpSchema, type SignUpSchema as SignUpFormValues } from '../validation/auth.validation'
import { PATH } from '@/resources/config/routes.config'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { VerifyOtpSchema } from '../validation/auth.validation'
import { ResetPasswordSchema } from '../validation/auth.validation'
import { generateAuthenticationOptions, verifyAuthenticationResponse } from '@simplewebauthn/server'
import type {
  AuthenticationResponseJSON,
  PublicKeyCredentialRequestOptionsJSON,
  AuthenticatorTransport,
} from '@simplewebauthn/types'
import { debugError } from '@/lib/utils'
import { db } from '@/packages/prisma/db'
import { hashPassword } from '@/packages/next-auth/utils'

export const ActionSignin = async () => {
  return await signIn('github', {
    redirect: true,
    redirectTo: PATH.PROTECTED.ORGANIZATION.ROOT,
  })
}

export const ActionSignOut = async () => {
  return await signOut({
    redirect: true,
    redirectTo: PATH.PUBLIC.AUTH.ROOT,
  })
}

export const ActionSignUp = async (values: SignUpFormValues) => {
  const validatedFields = SignUpSchema.safeParse(values)
  if (!validatedFields.success) return { error: true, message: 'Invalid input.' }
  const { name, email, password, terms } = validatedFields.data
  if (!terms) return { error: true, message: 'Terms and conditions must be accepted.' }
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    })
    if (existingUser) return { error: true, message: 'Email already in use. Please try another.' }
    const hashedPassword = await hashPassword(password)
    await db.user.create({
      data: {
        name,
        email,
        hashedPassword: hashedPassword,
        emailVerified: null,
      },
    })
    return { success: true, message: 'Account created successfully! You can now sign in.' }
  } catch (error) {
    debugError('SIGNUP_ERROR', error)
    return { error: true, message: 'Something went wrong. Please try again.' }
  }
}

export const handleForgotPassword = async (email: string) => {
  if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return { error: true, message: 'AUTH.INVALID_EMAIL' }
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (!existingUser) {
      // Return a generic message to prevent email enumeration
      return { success: true, message: 'AUTH.FORGOT_PASSWORD_OTP_SENT_IF_EXISTS' }
    }

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString()
    const hashedOtp = await bcrypt.hash(otp, 10)
    const expires = new Date(new Date().getTime() + 10 * 60 * 1000) // OTP expires in 10 minutes

    // Delete any existing OTPs for this email to prevent multiple active OTPs
    // This requires a way to distinguish OTPs if VerificationToken is used for other things.
    // Assuming for now we just overwrite or don't have type field.
    // If you add a 'type' field: db.verificationToken.deleteMany({ where: { identifier: email, type: 'PASSWORD_RESET_OTP' } })
    await db.verificationToken.deleteMany({
      where: { identifier: email },
    }) // Simplified: Deletes any token for this identifier

    await db.verificationToken.create({
      data: {
        identifier: email,
        token: hashedOtp, // Store the hashed OTP
        expires,
        // type: 'PASSWORD_RESET_OTP', // If you add type field
      },
    })

    // --- Nodemailer Setup ---
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.SMTP_FROM_EMAIL
    ) {
      debugError('SMTP_CONFIG_MISSING', 'SMTP environment variables are not fully configured.')
      return { error: true, message: 'AUTH.ERROR_SERVER_CONFIG' } // Generic error for server config issue
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: parseInt(process.env.SMTP_PORT, 10) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const mailOptions = {
      from: `"TaskFlow App" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: 'Your Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
      html: `<p>Your OTP for password reset is: <strong>${otp}</strong>.</p><p>It will expire in 10 minutes.</p>`,
    }

    await transporter.sendMail(mailOptions)
    // --- End Nodemailer Setup ---

    return { success: true, message: 'AUTH.FORGOT_PASSWORD_OTP_SENT_IF_EXISTS', emailToSendToVerifyPage: email }
  } catch (error) {
    debugError('FORGOT_PASSWORD_ERROR', error)
    // Type guard for error object with a code property
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      ((error as { code: unknown }).code === 'EENVELOPE' || (error as { code: unknown }).code === 'ECONNREFUSED')
    ) {
      return { error: true, message: 'AUTH.ERROR_SENDING_EMAIL' }
    }
    return { error: true, message: 'AUTH.ERROR_GENERIC_TRY_AGAIN' }
  }
}

interface VerifyOtpPayload {
  email: string
  otp: string
}

export const handleVerifyPasswordResetOtp = async (payload: VerifyOtpPayload) => {
  const { email, otp } = payload
  // Validate payload with VerifyOtpSchema on server too for robustness
  const validatedFields = VerifyOtpSchema.safeParse(payload)
  if (!validatedFields.success) {
    return { error: true, messageKey: 'AUTH.INVALID_OTP_PAYLOAD' }
  }

  try {
    const existingToken = await db.verificationToken.findFirst({
      where: {
        identifier: email,
        // token: hashedOtp, // We need to fetch first then compare, or filter by type if added
        // type: 'PASSWORD_RESET_OTP', // If type field exists
        expires: { gt: new Date() }, // Check for expiry
      },
      orderBy: {
        expires: 'desc', // Get the latest one if multiple (though we delete old ones)
      },
    })

    if (!existingToken) {
      return { error: true, messageKey: 'AUTH.INVALID_OR_EXPIRED_OTP' }
    }

    const isOtpValid = await bcrypt.compare(otp, existingToken.token)
    if (!isOtpValid) {
      return { error: true, messageKey: 'AUTH.INVALID_OR_EXPIRED_OTP' }
    }

    // OTP is valid, delete it
    await db.verificationToken.delete({
      where: { identifier_token: { identifier: email, token: existingToken.token } }, // Use compound key
      // Or use @@unique([identifier, token]) if no id: where: { identifier_token: { identifier: email, token: existingToken.token } }
    })

    // Generate a new secure grant token
    const grantToken = crypto.randomBytes(32).toString('hex')
    const grantTokenExpires = new Date(new Date().getTime() + 15 * 60 * 1000) // Grant token valid for 15 mins
    const hashedGrantToken = await bcrypt.hash(grantToken, 10) // Hash the grant token before storing

    await db.verificationToken.create({
      data: {
        identifier: email, // Or existingUser.id from a previous step if needed
        token: hashedGrantToken,
        expires: grantTokenExpires,
        // type: 'PASSWORD_RESET_GRANT', // If type field exists
      },
    })

    return { success: true, messageKey: 'AUTH.OTP_VERIFIED_SUCCESS', grantToken: grantToken } // Return plain grantToken
  } catch (error) {
    debugError('VERIFY_OTP_ERROR', error)
    return { error: true, messageKey: 'AUTH.ERROR_GENERIC_TRY_AGAIN' }
  }
}

interface ResetPasswordPayload {
  token: string // This is the plain grant token from the client
  password: string
}

export const handleResetPassword = async (payload: ResetPasswordPayload) => {
  const validatedFields = ResetPasswordSchema.safeParse(payload)
  if (!validatedFields.success) {
    // This error implies issues with data structure, not necessarily invalid token/password values yet.
    return { error: true, messageKey: 'AUTH.INVALID_RESET_PASSWORD_PAYLOAD' }
  }

  const { token: plainGrantToken, password } = validatedFields.data

  try {
    const hashedGrantToken = await bcrypt.hash(plainGrantToken, 10) // Hash the received plain token

    const existingGrantToken = await db.verificationToken.findFirst({
      where: {
        token: hashedGrantToken, // Compare with the hashed token in DB
        // type: 'PASSWORD_RESET_GRANT', // If type field exists
        expires: { gt: new Date() },
      },
    })

    if (!existingGrantToken) {
      return { error: true, messageKey: 'AUTH.INVALID_OR_EXPIRED_RESET_TOKEN', redirectToForgotPassword: true }
    }

    // Grant token is valid, find the user associated with it (identifier is email)
    const user = await db.user.findUnique({
      where: { email: existingGrantToken.identifier },
    })

    if (!user) {
      // Should not happen if grant token was valid and tied to an email
      debugError('RESET_PASSWORD_USER_NOT_FOUND', { tokenId: existingGrantToken.token }) // Changed id to token
      return { error: true, messageKey: 'AUTH.USER_NOT_FOUND_FOR_TOKEN', redirectToForgotPassword: true }
    }

    const newHashedPassword = await bcrypt.hash(password, 10)
    await db.user.update({
      where: { id: user.id },
      data: { hashedPassword: newHashedPassword }, // Changed password to hashedPassword
    })

    // Password updated, delete the grant token
    await db.verificationToken.delete({
      where: { identifier_token: { identifier: existingGrantToken.identifier, token: existingGrantToken.token } }, // Use compound key
    })

    // Optionally, log out user from other sessions for security
    // await db.session.deleteMany({ where: { userId: user.id } });

    return { success: true, messageKey: 'AUTH.PASSWORD_RESET_SUCCESS' }
  } catch (error) {
    debugError('RESET_PASSWORD_ERROR', error)
    return { error: true, messageKey: 'AUTH.ERROR_GENERIC_TRY_AGAIN' }
  }
}

// --- Passkey/WebAuthn Relying Party Details ---
// Ensure these are correctly set, preferably from environment variables for production
const rpID =
  process.env.NODE_ENV === 'development'
    ? 'localhost'
    : process.env.NEXTAUTH_URL
      ? new URL(process.env.NEXTAUTH_URL).hostname
      : 'localhost'
const rpName = 'TaskFlow App'
const expectedOrigin =
  process.env.NEXTAUTH_URL || (process.env.NODE_ENV === 'development' ? `http://${rpID}:3000` : `https://${rpID}`)

// Temporary store for challenges (replace with a more robust solution like Redis or DB for production if not using session/cookie)
interface ChallengeStoreEntry {
  challenge: string
  expires: number
}

// Placeholder type for Prisma Authenticator model instance
interface AuthenticatorPrismaType {
  credentialID: string
  credentialPublicKey: string
  counter: number
  transports?: string | null // Assuming transports is stored as a comma-separated string or null
  // ... other fields if necessary for the map function
}

const challengeStore: Map<string, ChallengeStoreEntry> = new Map<string, ChallengeStoreEntry>() // Fixed
const CHALLENGE_EXPIRY_MS = 5 * 60 * 1000 // 5 minutes
// --- End Passkey Setup ---

export const generatePasskeyLoginOptions = async (payload?: {
  email?: string
}): Promise<{ options?: PublicKeyCredentialRequestOptionsJSON; error?: string; messageKey?: string }> => {
  const userIdentifier = payload?.email || 'anonymous_passkey_user' // Use a generic identifier if no email
  let allowCredentialsOption: { id: Buffer; type: 'public-key'; transports?: AuthenticatorTransport[] }[] | undefined =
    undefined

  if (payload?.email) {
    const user = await db.user.findUnique({
      where: { email: payload.email },
      include: { Authenticator: true },
    })
    if (user?.Authenticator && user.Authenticator.length > 0) {
      allowCredentialsOption = user.Authenticator.map((auth: AuthenticatorPrismaType) => ({
        id: Buffer.from(auth.credentialID, 'base64url'),
        type: 'public-key',
        transports: auth.transports?.split(',') as AuthenticatorTransport[] | undefined,
      }))
    }
  }

  try {
    const options = await generateAuthenticationOptions({
      rpID,
      allowCredentials: allowCredentialsOption,
      userVerification: 'preferred',
      timeout: 60000, // 60 seconds
    })

    // Store the challenge for verification
    challengeStore.set(userIdentifier, { challenge: options.challenge, expires: Date.now() + CHALLENGE_EXPIRY_MS })

    return { options }
  } catch (error) {
    const { debugError } = await import('@/lib/utils') // Corrected import path
    debugError('PASSKEY_GEN_AUTH_OPTIONS_ERROR', error)
    return { error: 'Failed to generate passkey options.', messageKey: 'AUTH.PASSKEY_OPTIONS_GEN_ERROR' }
  }
}

interface VerifyPasskeyLoginPayload {
  assertion: AuthenticationResponseJSON
  email?: string // To retrieve the stored challenge and user
}

export const verifyPasskeyLogin = async (
  payload: VerifyPasskeyLoginPayload,
): Promise<{ success?: boolean; error?: string; messageKey?: string; userId?: string }> => {
  const { assertion, email } = payload
  const userIdentifier = email || 'anonymous_passkey_user' // Must match how challenge was stored

  const storedChallengeEntry = challengeStore.get(userIdentifier)
  if (!storedChallengeEntry || storedChallengeEntry.expires < Date.now()) {
    challengeStore.delete(userIdentifier)
    return { error: 'Challenge expired or not found.', messageKey: 'AUTH.PASSKEY_CHALLENGE_EXPIRED' }
  }
  challengeStore.delete(userIdentifier) // Challenge is single-use

  const authenticatorRecord = await db.authenticator.findUnique({
    where: { credentialID: assertion.id },
    include: { user: true },
  })

  if (!authenticatorRecord) {
    return { error: 'Authenticator not found.', messageKey: 'AUTH.PASSKEY_NOT_REGISTERED' }
  }

  try {
    const verification = await verifyAuthenticationResponse({
      response: assertion,
      expectedChallenge: storedChallengeEntry.challenge,
      expectedOrigin,
      expectedRPID: rpID,
      authenticator: {
        credentialID: Buffer.from(authenticatorRecord.credentialID, 'base64url'),
        credentialPublicKey: Buffer.from(authenticatorRecord.credentialPublicKey, 'base64url'),
        counter: authenticatorRecord.counter,
        transports: authenticatorRecord.transports?.split(',') as AuthenticatorTransport[] | undefined,
      },
      requireUserVerification: true, // Depends on your policy
    })

    if (verification.verified) {
      // Update the authenticator counter
      await db.authenticator.update({
        where: { credentialID: assertion.id },
        data: { counter: verification.authenticationInfo.newCounter },
      })

      // Here you would typically sign the user in with next-auth
      // This might involve creating a session manually or using a custom credentials provider
      // For now, just return success and userId
      return { success: true, userId: authenticatorRecord.userId, messageKey: 'AUTH.PASSKEY_SIGNIN_SUCCESS' }
    }
  } catch (error) {
    const { debugError } = await import('@/lib/utils') // Corrected import path
    debugError('PASSKEY_VERIFY_AUTH_ERROR', { error, assertionId: assertion.id })
    return { error: 'Passkey verification failed.', messageKey: 'AUTH.PASSKEY_VERIFICATION_FAILED' }
  }
  return { error: 'Passkey verification failed.', messageKey: 'AUTH.PASSKEY_VERIFICATION_FAILED' }
}
