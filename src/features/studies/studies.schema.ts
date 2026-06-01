import { z } from 'zod'
import { mediaSchema, DEFAULT_GENERAL_PIC } from '@/features'

// -------------------- Shared / reusable schemas --------------------

const richTextSchema = z.any().default('')

const participationItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().default(''),
  description: z.string().default(''),
})

const eligibilityCriterionSchema = z.object({
  id: z.string().optional(),
  item: z.string().default(''),
})

const faqItemSchema = z.object({
  id: z.string().optional(),
  question: z.string().default(''),
  answer: richTextSchema,
})

const contactSchema = z.object({
  email: z.string().default(''),
  address: z.string().default(''),
  phone: z.string().default(''),
})

// -------------------- Study detail template schemas --------------------

const heroStatsTemplateSchema = z
  .object({
    durationLabel: z.string().default('Duration'),
    compensationLabel: z.string().default('Compensation'),
    locationLabel: z.string().default('Location'),
  })
  .default({
    durationLabel: 'Duration',
    compensationLabel: 'Compensation',
    locationLabel: 'Location',
  })

const aboutSectionTemplateSchema = z
  .object({
    eyebrow: z.string().default('About'),
    heading: z.string().default('Why this study matters'),
  })
  .default({
    eyebrow: 'About',
    heading: 'Why this study matters',
  })

const participationSectionTemplateSchema = z
  .object({
    eyebrow: z.string().default('Participation'),
    heading: z.string().default("What you'll be asked to do"),
  })
  .default({
    eyebrow: 'Participation',
    heading: "What you'll be asked to do",
  })

const eligibilitySectionTemplateSchema = z
  .object({
    eyebrow: z.string().default('Eligibility'),
    heading: z.string().default("Who we're looking for"),
    inclusionHeading: z.string().default('You can join if'),
    exclusionHeading: z.string().default('You cannot join if'),
  })
  .default({
    eyebrow: 'Eligibility',
    heading: "Who we're looking for",
    inclusionHeading: 'You can join if',
    exclusionHeading: 'You cannot join if',
  })

const faqSectionTemplateSchema = z
  .object({
    eyebrow: z.string().default('FAQ'),
    heading: z.string().default('Common questions'),
  })
  .default({
    eyebrow: 'FAQ',
    heading: 'Common questions',
  })

const applyCardTemplateSchema = z
  .object({
    eyebrow: z.string().default('Apply'),
    heading: z.string().default("Check if you're eligible"),
    buttonLabel: z.string().default('Take eligibility Survey'),
    helperText: z
      .string()
      .default(
        "Survey takes ~5 min. We'll contact you within 2 working days if you qualify for screening.",
      ),
  })
  .default({
    eyebrow: 'Apply',
    heading: "Check if you're eligible",
    buttonLabel: 'Take eligibility Survey',
    helperText:
      "Survey takes ~5 min. We'll contact you within 2 working days if you qualify for screening.",
  })

const ethicsCardTemplateSchema = z
  .object({
    heading: z.string().default('Ethics approved'),
    approvedByPrefix: z.string().default('Approved by the'),
    committeeName: z.string().default('Southern Health and Disability Ethics Committee'),
  })
  .default({
    heading: 'Ethics approved',
    approvedByPrefix: 'Approved by the',
    committeeName: 'Southern Health and Disability Ethics Committee',
  })

const contactCardTemplateSchema = z
  .object({
    heading: z.string().default('Contact'),
  })
  .default({
    heading: 'Contact',
  })

// -------------------- NEW: Download PDF card template schema --------------------
// Controls the static label text for the sidebar PDF download card.
// The actual PDF file comes from the study's participantInfoPdf field.

const downloadPdfCardTemplateSchema = z
  .object({
    heading: z.string().default('Study Documents'),
    fileLabel: z.string().default('Participant Information Sheet'),
    fileSubLabel: z.string().default('PDF'),
    buttonLabel: z.string().default('Download'),
    helperText: z
      .string()
      .default('Download the participant information sheet for full details about this study.'),
  })
  .default({
    heading: 'Study Documents',
    fileLabel: 'Participant Information Sheet',
    fileSubLabel: 'PDF',
    buttonLabel: 'Download',
    helperText: 'Download the participant information sheet for full details about this study.',
  })

// -------------------------------------------------------------------------

const studyDetailTemplateSchema = z
  .object({
    backButtonLabel: z.string().default('Studies'),
    heroStats: heroStatsTemplateSchema,
    aboutSection: aboutSectionTemplateSchema,
    participationSection: participationSectionTemplateSchema,
    eligibilitySection: eligibilitySectionTemplateSchema,
    faqSection: faqSectionTemplateSchema,
    applyCard: applyCardTemplateSchema,
    ethicsCard: ethicsCardTemplateSchema,
    contactCard: contactCardTemplateSchema,
    // NEW
    downloadPdfCard: downloadPdfCardTemplateSchema,
  })
  .default({
    backButtonLabel: 'Studies',
    heroStats: {
      durationLabel: 'Duration',
      compensationLabel: 'Compensation',
      locationLabel: 'Location',
    },
    aboutSection: {
      eyebrow: 'About',
      heading: 'Why this study matters',
    },
    participationSection: {
      eyebrow: 'Participation',
      heading: "What you'll be asked to do",
    },
    eligibilitySection: {
      eyebrow: 'Eligibility',
      heading: "Who we're looking for",
      inclusionHeading: 'You can join if',
      exclusionHeading: 'You cannot join if',
    },
    faqSection: {
      eyebrow: 'FAQ',
      heading: 'Common questions',
    },
    applyCard: {
      eyebrow: 'Apply',
      heading: "Check if you're eligible",
      buttonLabel: 'Take eligibility Survey',
      helperText:
        "Survey takes ~5 min. We'll contact you within 2 working days if you qualify for screening.",
    },
    ethicsCard: {
      heading: 'Ethics approved',
      approvedByPrefix: 'Approved by the',
      committeeName: 'Southern Health and Disability Ethics Committee',
    },
    contactCard: {
      heading: 'Contact',
    },
    // NEW
    downloadPdfCard: {
      heading: 'Study Documents',
      fileLabel: 'Participant Information Sheet',
      fileSubLabel: 'PDF',
      buttonLabel: 'Download',
      helperText: 'Download the participant information sheet for full details about this study.',
    },
  })

// -------------------- Study collection DTO --------------------

export const studySchema = z.object({
  id: z.number(),

  title: z.string().default(''),
  subtitle: z.string().default(''),
  studyCode: z.string().default(''),

  duration: z.string().default(''),
  compensation: z.string().default(''),
  location: z.string().default(''),

  eligibility: z.string().default(''),
  slug: z.string().default(''),

  banner: mediaSchema.default(DEFAULT_GENERAL_PIC),

  description: richTextSchema,

  participationItems: z.array(participationItemSchema).default([]),

  eligibilityInclusion: z.array(eligibilityCriterionSchema).default([]),

  eligibilityExclusion: z.array(eligibilityCriterionSchema).default([]),

  faqs: z.array(faqItemSchema).default([]),

  surveyUrl: z.string().default(''),

  ethicsApprovalRef: z.string().default(''),

  // NEW — populated upload relationship; null when no PDF has been uploaded
  participantInfoPdf: z
    .object({
      url: z.string(),
      filename: z.string(),
      mimeType: z.string().optional(),
      filesize: z.number().optional(),
    })
    .nullable()
    .default(null),

  sortOrder: z.number().default(100000),
})

export type StudyDTO = z.infer<typeof studySchema>

// -------------------- Studies Page global DTO --------------------

const listingPageSchema = z
  .object({
    title: z.string().default(''),
    banner: mediaSchema.default(DEFAULT_GENERAL_PIC),
    studiesDisplay: z.array(studySchema).default([]),
  })
  .default({
    title: '',
    banner: DEFAULT_GENERAL_PIC,
    studiesDisplay: [],
  })

export const studiesDTOSchema = z.object({
  listingPage: listingPageSchema,

  contact: contactSchema.default({
    email: '',
    address: '',
    phone: '',
  }),

  detailTemplate: studyDetailTemplateSchema,
})

export type StudiesPageDTO = z.infer<typeof studiesDTOSchema>
