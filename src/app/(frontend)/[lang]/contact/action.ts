'use server'

import { sendContactFormEmail } from '@/queries/SendEmail'

export async function sendContactEmail(formData: FormData) {
  const name = String(formData.get('name') || '')
  const email = String(formData.get('email') || '')
  const phone = String(formData.get('phone') || '')
  const message = String(formData.get('message') || '')

  if (!name || !email || !message) {
    throw new Error('Name, email, and message are required.')
  }

  await sendContactFormEmail({
    name,
    email,
    phone,
    message,
  })
}
