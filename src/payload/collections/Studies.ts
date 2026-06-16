import type { CollectionConfig } from 'payload'

export const Studies: CollectionConfig = {
  slug: 'studies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    listSearchableFields: ['title', 'slug'],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        components: {
          afterInput: [
            '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
          ],
        },
      },
    },

    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      required: false,
      admin: {
        components: {
          afterInput: [
            '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
          ],
        },
      },
    },

    // -------------------- Hero strip --------------------
    {
      name: 'duration',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Short label, e.g. "6 weeks · 4 visits".',
        components: {
          afterInput: [
            '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
          ],
        },
      },
    },

    {
      name: 'compensation',
      type: 'text',
      required: true,
      admin: {
        description: 'Payment offered to participants, e.g. "NZ$ 1,200" or "Unpaid".',
      },
    },

    {
      name: 'location',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Where the study takes place, e.g. "Mt Eden".',
        components: {
          afterInput: [
            '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
          ],
        },
      },
    },

    // -------------------- Listing card summary --------------------
    {
      name: 'eligibility',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Short summary used on the listing card, e.g. "Adults 25–55, BMI 22–32".',
        components: {
          afterInput: [
            '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
          ],
        },
      },
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title, e.g. nutrition-study-2026',
      },
    },

    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },

    // -------------------- About body --------------------
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
      label: 'About / Why this study matters',
      admin: {
        components: {
          afterInput: [
            '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
          ],
        },
      },
    },

    // -------------------- Participation steps --------------------
    {
      name: 'participationItems',
      type: 'array',
      label: 'Participation steps',
      admin: {
        description:
          'Bulleted "What you\'ll be asked to do" items. Each row has a short title and a 1–2 sentence description.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            components: {
              afterInput: [
                '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
          admin: {
            components: {
              afterInput: [
                '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
      ],
    },

    // -------------------- Eligibility lists --------------------
    {
      name: 'eligibilityInclusion',
      type: 'array',
      label: 'Eligibility — You can join if',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            components: {
              afterInput: [
                '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
      ],
    },

    {
      name: 'eligibilityExclusion',
      type: 'array',
      label: 'Eligibility — You cannot join if',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            components: {
              afterInput: [
                '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
      ],
    },

    // -------------------- FAQ --------------------
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQ',
      admin: {
        description: 'Frequently asked questions specific to this study.',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            components: {
              afterInput: [
                '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          localized: true,
          admin: {
            components: {
              afterInput: [
                '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
      ],
    },

    // -------------------- Sidebar CTA / ethics --------------------
    {
      name: 'surveyUrl',
      type: 'text',
      required: true,
      admin: {
        description: 'URL the "Take eligibility Survey" button links to.',
      },
    },

    {
      name: 'ethicsApprovalRef',
      type: 'text',
      required: true,
      admin: {
        description: 'Ethics approval reference, e.g. "AHREC ref 12345".',
      },
    },

    // -------------------- Participant information PDF --------------------
    {
      name: 'participantInfoPdf',
      type: 'upload',
      relationTo: 'documents',
      required: false,
      label: 'Participant Information Sheet (PDF)',
      admin: {
        description:
          'Upload the participant information sheet PDF. When present, a download card will appear in the study sidebar.',
      },
    },

    {
      name: 'chineseTranslationApproved',
      type: 'checkbox',
      defaultValue: false,
      label: 'Chinese translation approved for display',
      admin: {
        description:
          'Tick ONLY when the Chinese translation of this study has been reviewed and confirmed accurate and ethical. While unticked, Chinese visitors see the English content with a warning notice. Auto-translated text is NOT a substitute for review.',
      },
    },
  ],
}
