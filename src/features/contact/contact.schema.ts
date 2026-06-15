import { z } from 'zod'
import { mediaSchema } from '../common/media.schema'
import { seoMetaSchema } from '../common'

export const enquiryTagSchema = z.object({
  id: z.union([z.string(), z.number()]),
  label: z.string(),
  recipientEmail: z.string().email(),
})

export const contactFormSchema = z.object({
  name: z.string().default('Name'),
  email: z.string().default('Email Address'),
  phone: z.string().default('Phone Number'),
  message: z.string().default('Your Message'),
  namePlaceholder: z.string().default('John Doe'),
  emailPlaceholder: z.string().default('[example@gmail.com](mailto:example@gmail.com)'),
  phonePlaceholder: z.string().default('0226461819'),
  messagePlaceholder: z.string().default('Let us know how we can help'),
  enquiryTypeLabel: z.string().default('Enquiry Type'),
  enquiryTypePlaceholder: z.string().default('Please select…'),
  buttonTitle: z.string().default('Send Message'),
  recipientEmail: z
    .string()
    .email()
    .default('[example@auckland.ac.nz](mailto:example@auckland.ac.nz)'),
})

export const contactPageDTOSchema = z.object({
  heroTitle: z.string().default('Contact Us'),
  heroImage: mediaSchema.required(),
  heroImageAlt: z.string().default('Contact page hero image'),
  form: contactFormSchema,
  mapSrc: z
    .string()
    .default(
      'https://www.google.com/maps?q=18%20Carrick%20Place%2C%20Mt%20Eden%2C%20Auckland%201024%2C%20New%20Zealand&output=embed',
    ),
  meta: seoMetaSchema,
})

export type EnquiryTagDTO = z.infer<typeof enquiryTagSchema>
export type ContactFormDTO = z.infer<typeof contactFormSchema>
export type ContactPageDTO = z.infer<typeof contactPageDTOSchema>
