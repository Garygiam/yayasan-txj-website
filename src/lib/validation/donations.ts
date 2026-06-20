import {z} from 'zod'

export const createDonationSchema = z.object({
  amountMYR: z.number().min(1),
  email: z.string().email().optional(),
})

export type CreateDonationPayload = z.infer<typeof createDonationSchema>

