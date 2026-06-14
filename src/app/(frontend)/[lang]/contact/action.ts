'use server'

import { sendContactFormEmail } from '@/features/contact/sendEmail.query'
import type { ContactFormState } from '@/types/contact'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\d{7,15}$/

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const message = String(formData.get('message') || '').trim()
  const enquiryTagId = String(formData.get('enquiryTagId') || '').trim()

  if (!name || !email || !message || !enquiryTagId) {
    return {
      status: 'error',
      message: 'Please fill in name, email, message, and enquiry type.',
    }
  }

  if (!EMAIL_RE.test(email)) {
    return {
      status: 'error',
      message: 'Please enter a valid email address.',
    }
  }

  if (phone && !PHONE_RE.test(phone)) {
    return {
      status: 'error',
      message: 'Phone number must be 7–15 digits, numbers only.',
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
