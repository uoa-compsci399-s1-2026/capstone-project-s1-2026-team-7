'use server'
import { getContactPage } from '@/queries/contactPage'
import { getPayloadClient } from '@/lib/payload'

const escapeHtml = (value: string) => {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function sendContactEmail(formData: FormData) {
  const name = String(formData.get('name') || '')
  const email = String(formData.get('email') || '')
  const phone = String(formData.get('phone') || '')
  const message = String(formData.get('message') || '')

  if (!name || !email || !message) {
    throw new Error('Name, email, and message are required.')
  }

  const contactPage = await getContactPage('en')
  const payload = await getPayloadClient()

  await payload.sendEmail({
    to: contactPage.form.recipientEmail,
    subject: `New contact form message from ${name}`,
    replyTo: email,
    html: `
      <h2>New message from the contact form</h2>

      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>

      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replaceAll('\n', '<br />')}</p>
    `,
  })

  console.log('sent message')
}
