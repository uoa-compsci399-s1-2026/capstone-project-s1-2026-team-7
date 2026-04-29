import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  fields: [
    {
      name: 'heroTitle',
      label: 'Hero Title',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Contact Us',
    },
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'heroImageAlt',
      label: 'Hero Image Alt Text',
      type: 'text',
      localized: true,
      defaultValue: 'Contact page hero image',
    },
    {
      name: 'form',
      label: 'Contact Form',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          localized: true,
          defaultValue: 'Name',
          required: true,
        },
        {
          name: 'email',
          type: 'text',
          localized: true,
          defaultValue: 'Email Address',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          localized: true,
          defaultValue: 'Phone Number',
          required: true,
        },
        {
          name: 'message',
          type: 'text',
          localized: true,
          defaultValue: 'Your Message',
          required: true,
        },
        {
          name: 'namePlaceholder',
          type: 'text',
          localized: true,
          defaultValue: 'John Doe',
        },
        {
          name: 'emailPlaceholder',
          type: 'text',
          localized: true,
          defaultValue: 'example@gmail.com',
        },
        {
          name: 'phonePlaceholder',
          type: 'text',
          localized: true,
          defaultValue: '0226461819',
        },
        {
          name: 'messagePlaceholder',
          type: 'text',
          localized: true,
          defaultValue: 'Let us know how we can help',
        },
        {
          name: 'buttonTitle',
          type: 'text',
          localized: true,
          defaultValue: 'Send Message',
          required: true,
        },
        {
          name: 'recipientEmail',
          label: 'Recipient Email',
          type: 'email',
          required: true,
          defaultValue: 'example@auckland.ac.nz',
        },
      ],
    },
    {
      name: 'mapSrc',
      label: 'Google Maps Embed URL',
      type: 'text',
      required: true,
      defaultValue:
        'https://www.google.com/maps?q=18%20Carrick%20Place%2C%20Mt%20Eden%2C%20Auckland%201024%2C%20New%20Zealand&output=embed',
    },
  ],
}
