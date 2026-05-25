import type { Block } from 'payload'

export const WhoWeAreBlock: Block = {
  slug: 'who-we-are',
  interfaceName: 'WhoWeAreBlock',
  labels: {
    singular: 'Who We Are Section',
    plural: 'Who We Are Sections',
  },
  admin: {
    group: 'Static Components',
    disableBlockName: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      localized: true,
      defaultValue: 'Who We Are',
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
      label: 'Description',
      required: true,
      localized: true,
      defaultValue:
        'The HNU is a premier research facility within the University of Auckland, distinguished as the only residential nutrition unit in Australasia.\n\nOur specialized environment allows for the characterization of diverse populations through safety and efficacy trials that are analogous to pharmaceutical-grade clinical standards.',
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
      label: 'Image',
      relationTo: 'media',
      required: true,
    },
  ],
}
