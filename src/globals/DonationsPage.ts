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
          name: 'image',
          label: 'Hero Image',
          type: 'upload',
          relationTo: 'media',
          required: false,
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
                {
                  label: 'Graduates',
                  value: 'graduates',
                },
                {
                  label: 'Publications',
                  value: 'publications',
                },
                {
                  label: 'Partners',
                  value: 'partners',
                },
                {
                  label: 'Participants',
                  value: 'participants',
                },
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

    /**
     * PARTNERS SECTION
     */
    {
      name: 'partners',
      label: 'Partners',
      type: 'array',

      fields: [
        {
          name: 'logo',
          label: 'Logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },

        {
          name: 'alt',
          label: 'Alt Text',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },

    /**
     * DONATION LINK SECTION
     */
    {
      name: 'donationLink',
      label: 'Donation Link Section',
      type: 'group',

      fields: [
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

        {
          name: 'backgroundImage',
          label: 'Background Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },

        {
          name: 'button',
          label: 'Button',
          type: 'group',

          fields: [
            {
              name: 'label',
              label: 'Button Label',
              type: 'text',
              localized: true,
              required: true,
            },

            {
              name: 'url',
              label: 'Button URL',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
