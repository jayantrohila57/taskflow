import { z } from 'zod'

const PasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password too long')
  .refine((p) => /[A-Z]/.test(p), 'Must include an uppercase letter')
  .refine((p) => /[0-9]/.test(p), 'Must include a number')

export const SignUpSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Please enter your name, required.',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address, required.',
    }),
    password: PasswordSchema,
    passwordConfirmation: z.string().min(6, {
      message: 'Please confirm your password, required.',
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions to continue.',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match.',
    path: ['passwordConfirmation'],
  })

export type SignUpSchema = z.infer<typeof SignUpSchema>

export const SignInSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address, required.',
  }),
  password: z.string().min(1, {
    // Min 1 for password as next-auth handles specific password policies if any
    message: 'Please enter your password, required.',
  }),
})

export type SignInSchema = z.infer<typeof SignInSchema>

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address to reset your password.',
  }),
})

export type ForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>

export const VerifyOtpSchema = z.object({
  email: z.string().email(), // Include email to associate OTP, passed hidden or from context
  otp: z.string().min(6, { message: 'OTP must be 6 digits.' }).max(6, { message: 'OTP must be 6 digits.' }),
})
export type VerifyOtpSchema = z.infer<typeof VerifyOtpSchema>

export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, { message: 'Password reset token is required.' }), // The grant token
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match.',
    path: ['passwordConfirmation'],
  })
export type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>
