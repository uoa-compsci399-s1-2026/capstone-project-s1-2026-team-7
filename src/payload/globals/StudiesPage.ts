import type { Field, GlobalConfig } from 'payload'

const translateButton = [
  '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
]

const localizedTextField = (
  name: string,
  label: string,
  defaultValue: string,
  required = true,
): Field => ({
  name,
  type: 'text',
  label,
  localized: true,
  required,
  defaultValue,
  admin: {
    components: {
      afterInput: translateButton,
    },
  },
})

const localizedTextareaField = (
  name: string,
  label: string,
  defaultValue: string,
  required = true,
): Field => ({
  name,
  type: 'textarea',
  label,
  localized: true,
  required,
  defaultValue,
  admin: {
    components: {
      afterInput: translateButton,
    },
  },
})

export const StudiesPage: GlobalConfig = {
  slug: 'studies-page',
  label: 'Studies Page',
  admin: {
    description:
      'Controls the Studies listing page and reusable static text shown on study detail pages.',
  },
  fields: [
    {
      name: 'listingPage',
      type: 'group',
      label: 'Studies listing page',
      fields: [
        localizedTextField('title', 'Page title', 'Studies'),

        {
          name: 'banner',
          type: 'upload',
          relationTo: 'media',
          label: 'Banner',
          required: true,
        },

        {
          name: 'studiesDisplay',
          type: 'relationship',
          relationTo: 'studies',
          hasMany: true,
          label: 'Studies to display',
          admin: {
            allowCreate: true,
            allowEdit: true,
            description: 'Choose which studies appear on the Studies listing page.',
          },
        },
      ],
    },

    {
      name: 'detailTemplate',
      type: 'group',
      label: 'Study detail page template text',
      fields: [
        localizedTextField('backButtonLabel', 'Back button label', 'Studies'),

        {
          name: 'heroStats',
          type: 'group',
          label: 'Hero information strip labels',
          fields: [
            localizedTextField('durationLabel', 'Duration label', 'Duration'),
            localizedTextField('compensationLabel', 'Compensation label', 'Compensation'),
            localizedTextField('locationLabel', 'Location label', 'Location'),
          ],
        },

        {
          name: 'aboutSection',
          type: 'group',
          label: 'About section',
          fields: [
            localizedTextField('eyebrow', 'Small section label', 'About'),
            localizedTextField('heading', 'Heading', 'Why this study matters'),
          ],
        },

        {
          name: 'participationSection',
          type: 'group',
          label: 'Participation section',
          fields: [
            localizedTextField('eyebrow', 'Small section label', 'Participation'),
            localizedTextField('heading', 'Heading', "What you'll be asked to do"),
          ],
        },

        {
          name: 'eligibilitySection',
          type: 'group',
          label: 'Eligibility section',
          fields: [
            localizedTextField('eyebrow', 'Small section label', 'Eligibility'),
            localizedTextField('heading', 'Heading', "Who we're looking for"),
            localizedTextField('inclusionHeading', 'Inclusion box heading', 'You can join if'),
            localizedTextField('exclusionHeading', 'Exclusion box heading', 'You cannot join if'),
          ],
        },

        {
          name: 'faqSection',
          type: 'group',
          label: 'FAQ section',
          fields: [
            localizedTextField('eyebrow', 'Small section label', 'FAQ'),
            localizedTextField('heading', 'Heading', 'Common questions'),
          ],
        },

        {
          name: 'applyCard',
          type: 'group',
          label: 'Sidebar apply card',
          fields: [
            localizedTextField('eyebrow', 'Small card label', 'Apply'),
            localizedTextField('heading', 'Heading', "Check if you're eligible"),
            localizedTextField('buttonLabel', 'Button label', 'Take eligibility Survey'),
            localizedTextareaField(
              'helperText',
              'Helper text',
              "Survey takes ~5 min. We'll contact you within 2 working days if you qualify for screening.",
            ),
          ],
        },

        {
          name: 'ethicsCard',
          type: 'group',
          label: 'Sidebar ethics card',
          fields: [
            localizedTextField('heading', 'Heading', 'Ethics approved'),
            localizedTextField('approvedByPrefix', 'Approved by prefix', 'Approved by the'),
            localizedTextField(
              'committeeName',
              'Default committee name',
              'Southern Health and Disability Ethics Committee',
            ),
          ],
        },

        {
          name: 'contactCard',
          type: 'group',
          label: 'Sidebar contact card',
          fields: [localizedTextField('heading', 'Heading', 'Contact')],
        },
      ],
    },

    {
      name: 'contact',
      type: 'group',
      label: 'Contact info shown in the sidebar of every study detail page',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          defaultValue: 'HNU_SYNERGY@auckland.ac.nz',
          admin: {
            description: 'e.g. HNU_SYNERGY@auckland.ac.nz',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
          localized: true,
          defaultValue: '18 Carrick Place, Mount Eden, Auckland 1024',
          admin: {
            description: 'Multi-line address shown in the sidebar.',
            components: {
              afterInput: translateButton,
            },
          },
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          defaultValue: '021 0919 5443',
          admin: {
            description: 'e.g. 021 0919 5443',
          },
        },
      ],
    },
  ],
}
