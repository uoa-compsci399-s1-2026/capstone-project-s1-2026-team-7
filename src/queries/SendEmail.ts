import { getContactPage } from '@/queries/contactPage'
import { getPayloadClient } from '@/lib/payload'

type SendContactEmailInput = {
  name: string
  email: string
  phone: string
  message: string
}

const escapeHtml = (value: string) => {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function sendContactFormEmail({ name, email, phone, message }: SendContactEmailInput) {
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
}
