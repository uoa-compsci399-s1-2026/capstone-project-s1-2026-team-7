import type { Block } from 'payload'

const translateButton =
  '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton'

export const VideoBlock: Block = {
  slug: 'video',
  interfaceName: 'VideoBlock',
  labels: {
    singular: 'Video Section',
    plural: 'Video Sections',
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
      defaultValue: 'Media',
      admin: {
        components: {
          afterInput: [translateButton],
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      localized: true,
      admin: {
        components: {
          afterInput: [translateButton],
        },
      },
    },
    {
      name: 'videos',
      type: 'array',
      label: 'Videos',
      required: true,
      minRows: 1,
      maxRows: 20,
      labels: {
        singular: 'Video',
        plural: 'Videos',
      },
      fields: [
        {
          name: 'url',
          type: 'text',
          label: 'YouTube URL or video ID',
          required: true,
          // Not localized — the link is the same in every language.
          admin: {
            description:
              'Paste the full YouTube link (watch, youtu.be, shorts or embed) or the 11-character video ID.',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Video Title',
          localized: true,
          admin: {
            components: {
              afterInput: [translateButton],
            },
          },
        },
        {
          name: 'caption',
          type: 'textarea',
          label: 'Caption',
          localized: true,
          admin: {
            components: {
              afterInput: [translateButton],
            },
          },
        },
      ],
    },
  ],
}

export default VideoBlock
