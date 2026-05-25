import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Studies } from './payload/collections/Studies'
import { Staff } from './payload/collections/Staff'
import { Research } from './payload/collections/Research'
import { ResearchCategories } from './payload/collections/ResearchCategories'
import { ResearchCsvTools } from './payload/collections/ResearchCsvTools'

import { HomePage } from './payload/globals/Homepage'
import { OurTeamPage } from './payload/globals/OurTeamPage'
import { StudiesPage } from './payload/globals/StudiesPage'
import { ResearchPage } from './payload/globals/ResearchPage'
import { DonationsPage } from './payload/globals/DonationsPage'
import { NavigationBar } from './payload/globals/NavigationBar'
import { Footer } from './payload/globals/Footer'
import { ContactPage } from './payload/globals/ContactPage'
import { EnquiryTags } from './payload/collections/EnquiryTags'
import { translateEndpoint } from './payload/endpoints/translate'
import {
  researchCsvExportEndpoint,
  researchCsvImportEndpoint,
} from './payload/endpoints/researchCsv'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const autopush = process.env.AUTOPUSH === 'true'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    theme: 'light',
    meta: {
      titleSuffix: ' — HNU Admin',
      title: 'HNU Admin',
      description: 'Human Nutrition Unit content management',
      icons: [{ rel: 'icon', type: 'image/png', url: '/HNU%20logo%20HD.png' }],
    },
    components: {
      graphics: {
        Logo: '/payload/components/admin/HNULogo#HNULogo',
        Icon: '/payload/components/admin/HNUIcon#HNUIcon',
      },
    },
  },

  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'noreply@example.com',
    defaultFromName: process.env.EMAIL_FROM_NAME || 'Human Nutrition Unit',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  localization: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: [
    Users,
    Media,
    Staff,
    Studies,
    Research,
    ResearchCategories,
    ResearchCsvTools,
    EnquiryTags,
  ],

  globals: [
    HomePage,
    OurTeamPage,
    DonationsPage,
    StudiesPage,
    ResearchPage,
    NavigationBar,
    ContactPage,
    Footer,
  ],

  endpoints: [translateEndpoint, researchCsvExportEndpoint, researchCsvImportEndpoint],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: autopush,
    migrationDir: path.resolve(process.cwd(), 'migrations'),
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION,
        // ... Other S3 configuration
      },
    }),
  ],
})
