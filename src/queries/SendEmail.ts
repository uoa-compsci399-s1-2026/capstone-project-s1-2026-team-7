import { getContactPage } from '@/queries/contactPage'
import { getPayloadClient } from '@/lib/payload'

type SendContactEmailInput = {
  name: string
  email: string
  phone: string
  message: string
  enquiryTagId: string
}

const escapeHtml = (value: string) => {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function sendContactFormEmail({
  name,
  email,
  phone,
  message,
  enquiryTagId,
}: SendContactEmailInput) {
  const payload = await getPayloadClient()
  const contactPage = await getContactPage('en')

  let recipientEmail = contactPage.form.recipientEmail
  let tagLabel: string | null = null

  try {
    const tag = await payload.findByID({
      collection: 'enquiry-tags',
      id: enquiryTagId,
      locale: 'en',
      depth: 0,
    })
    if (tag?.recipientEmail) {
      recipientEmail = tag.recipientEmail
      tagLabel = tag.label ?? null
    }
  } catch {}

  await payload.sendEmail({
    to: recipientEmail,
    subject: tagLabel
      ? `[${tagLabel}] New contact form message from ${name}`
      : `New contact form message from ${name}`,
    replyTo: email,
    html: `
      <h2>New message from the contact form</h2>

      ${tagLabel ? `<p><strong>Enquiry type:</strong> ${escapeHtml(tagLabel)}</p>` : ''}
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>

      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replaceAll('\n', '<br />')}</p>
    `,
  })
}
