import {z} from 'zod'

export const contactSchema = z.object({
  type: z.literal('contact'),
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  hcaptchaToken: z.string().min(1),
})

export const volunteerSchema = z.object({
  type: z.literal('volunteer'),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  preferredRoles: z.array(z.string()).min(1),
  availability: z.string().min(1),
  location: z.string().min(1),
  message: z.string().optional(),
  hcaptchaToken: z.string().min(1),
})

export const partnerSchema = z.object({
  type: z.literal('partner'),
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  partnershipTypes: z.array(z.string()).min(1),
  message: z.string().min(1),
  hcaptchaToken: z.string().min(1),
})

export const formSchema = z.discriminatedUnion('type', [contactSchema, volunteerSchema, partnerSchema])

export type FormPayload = z.infer<typeof formSchema>

