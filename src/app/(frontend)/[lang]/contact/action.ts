'use server'

import { sendContactFormEmail } from '@/queries/SendEmail'
import type { ContactFormState } from '@/types/contact'

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get('name') || '')
  const email = String(formData.get('email') || '')
  const phone = String(formData.get('phone') || '')
  const message = String(formData.get('message') || '')
  const enquiryTagId = String(formData.get('enquiryTagId') || '')

  if (!name || !email || !message || !enquiryTagId) {
    return {
      status: 'error',
      message: 'Please fill in name, email, message, and enquiry type.',
    }
  }

  try {
    await sendContactFormEmail({ name, email, phone, message, enquiryTagId })
    return {
      status: 'success',
      message: 'Thanks — your message has been sent. We’ll be in touch soon.',
    }
  } catch (err) {
    console.error('Contact form submission failed:', err)
    return {
      status: 'error',
      message: 'Something went wrong sending your message. Please try again.',
    }
  }
}
