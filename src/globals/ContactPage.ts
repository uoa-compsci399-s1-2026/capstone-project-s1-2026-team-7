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
      admin: {
        components: {
          afterInput: ['/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton'],
        },
      },
    },
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
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
          admin: {
            components: {
              afterInput: [
                '/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
        {
          name: 'email',
          type: 'text',
          localized: true,
          defaultValue: 'Email Address',
          required: true,
          admin: {
            components: {
              afterInput: [
                '/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
        {
          name: 'phone',
          type: 'text',
          localized: true,
          defaultValue: 'Phone Number',
          required: true,
          admin: {
            components: {
              afterInput: [
                '/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
        {
          name: 'message',
          type: 'text',
          localized: true,
          defaultValue: 'Your Message',
          required: true,
          admin: {
            components: {
              afterInput: [
                '/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
        {
          name: 'namePlaceholder',
          type: 'text',
          defaultValue: 'John Doe',
        },
        {
          name: 'emailPlaceholder',
          type: 'text',
          defaultValue: 'example@gmail.com',
        },
        {
          name: 'phonePlaceholder',
          type: 'text',
          defaultValue: '0226461819',
        },
        {
          name: 'messagePlaceholder',
          type: 'text',
          defaultValue: 'Let us know how we can help',
        },
        {
          name: 'enquiryTypeLabel',
          type: 'text',
          localized: true,
          defaultValue: 'Enquiry Type',
          required: true,
          admin: {
            components: {
              afterInput: [
                '/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
        {
          name: 'enquiryTypePlaceholder',
          type: 'text',
          defaultValue: 'Please select…',
        },
        {
          name: 'buttonTitle',
          type: 'text',
          localized: true,
          defaultValue: 'Send Message',
          required: true,
          admin: {
            components: {
              afterInput: [
                '/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
        {
          name: 'recipientEmail',
          label: 'Fallback Recipient Email',
          type: 'email',
          required: true,
          defaultValue: 'example@auckland.ac.nz',
          admin: {
            description:
              'Used only if no enquiry tag is selected or the selected tag no longer exists.',
          },
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
