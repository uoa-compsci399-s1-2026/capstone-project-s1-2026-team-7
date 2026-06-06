import type { CollectionConfig } from 'payload'

const formalTitleLabels: Record<string, string> = {
  dr: 'Dr',
  professor: 'Professor',
  'associate-professor': 'Associate Professor',
  mr: 'Mr',
  mrs: 'Mrs',
  ms: 'Ms',
}

const buildFullName = (data: {
  formaltitle?: unknown
  firstname?: unknown
  lastname?: unknown
}) => {
  const formalTitle =
    typeof data.formaltitle === 'string' && data.formaltitle
      ? formalTitleLabels[data.formaltitle] || ''
      : ''

  const firstname = typeof data.firstname === 'string' ? data.firstname : ''
  const lastname = typeof data.lastname === 'string' ? data.lastname : ''

  return [formalTitle, firstname, lastname]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' ')
}

export const Staff: CollectionConfig = {
  slug: 'staff',
  timestamps: true,

  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'firstname', 'lastname', 'jobTitle', 'manager'],
  },

  hooks: {
    beforeValidate: [
      ({ data, originalDoc }) => {
        const mergedData = {
          ...originalDoc,
          ...data,
        }

        return {
          ...data,
          fullName: buildFullName(mergedData),
        }
      },
    ],
  },

  fields: [
    {
      name: 'fullName',
      label: 'Full name',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'formaltitle',
      label: 'Formal title',
      type: 'select',
      required: false,
      options: [
        { label: 'Dr', value: 'dr' },
        { label: 'Professor', value: 'professor' },
        { label: 'Associate Professor', value: 'associate-professor' },
        { label: 'Mr', value: 'mr' },
        { label: 'Mrs', value: 'mrs' },
        { label: 'Ms', value: 'ms' },
      ],
    },
    { name: 'firstname', label: 'First name', type: 'text', required: true },
    { name: 'lastname', label: 'Last name', type: 'text', required: true },
    { name: 'orcid', type: 'text' },
    { name: 'jobTitle', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    { name: 'manager', type: 'checkbox', defaultValue: false, required: true },
    { name: 'uoaProfileLink', type: 'text' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'sortOrder', type: 'number' },
  ],
}
