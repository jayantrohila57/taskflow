import { z } from 'zod'

export const organizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().max(1000).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Organization = z.infer<typeof organizationSchema>
