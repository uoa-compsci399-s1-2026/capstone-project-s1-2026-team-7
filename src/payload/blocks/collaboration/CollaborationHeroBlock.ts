import { Block } from 'payload'

export const CollaborationHeroBlock: Block = {
  slug: 'collaborationHero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
