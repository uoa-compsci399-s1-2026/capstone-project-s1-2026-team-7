import type { CollectionConfig } from 'payload'

export const ResearchCategories: CollectionConfig = {
  slug: 'research-categories',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
