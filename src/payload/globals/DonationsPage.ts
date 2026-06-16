import type { GlobalConfig } from 'payload'

export const DonationsPage: GlobalConfig = {
  slug: 'donations-page',
  label: 'Donations Page',

  fields: [
    /**
     * HERO SECTION
     */
    {
      name: 'hero',
      label: 'Hero Section',
      type: 'group',

      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          localized: true,
          required: true,
          defaultValue: 'Donations That Change The World',
        },
        {
          name: 'blurb',
          label: 'Blurb',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'buttonLabel',
          label: 'Button Label',
          type: 'text',
          localized: true,
          defaultValue: 'Make a Donation',
        },
        {
          name: 'donateUrl',
          label: 'Donate Button URL',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          label: 'Hero Image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'backgroundImage',
          label: 'Background Image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description:
              'Optional. Shown behind the hero; falls back to the blue gradient if empty.',
          },
        },
      ],
    },

    /**
     * SUPPORT SECTION
     */
    {
      name: 'supportSection',
      label: 'Support Section',
      type: 'group',

      fields: [
        {
          name: 'heading',
          label: 'Heading',
          type: 'text',
          localized: true,
          required: true,
          defaultValue: 'What Your Support Enables',
        },
        {
          name: 'items',
          label: 'Cards',
          type: 'array',

          fields: [
            {
              name: 'icon',
              label: 'Icon',
              type: 'select',
              required: true,
              options: [
                { label: 'Microscope', value: 'microscope' },
                { label: 'Bed', value: 'bed' },
                { label: 'Building', value: 'building' },
                { label: 'Heart', value: 'heart' },
              ],
            },
            {
              name: 'title',
              label: 'Title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },

    /**
     * STATS SECTION
     */
    {
      name: 'stats',
      label: 'Stats Section',
      type: 'group',

      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          localized: true,
          required: true,
          defaultValue: 'Your Impact',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'stats',
          label: 'Stats',
          type: 'array',

          fields: [
            {
              name: 'key',
              label: 'Icon Key',
              type: 'select',
              required: true,
              options: [
                { label: 'Graduates', value: 'graduates' },
                { label: 'Publications', value: 'publications' },
                { label: 'Partners', value: 'partners' },
                { label: 'Participants', value: 'participants' },
              ],
            },
            {
              name: 'value',
              label: 'Value',
              type: 'number',
              required: true,
            },
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
