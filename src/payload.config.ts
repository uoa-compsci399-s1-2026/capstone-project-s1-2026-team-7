import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Studies } from './collections/Studies'
import { Staff } from './collections/Staff'
import { Research } from './collections/Research'
import { ResearchCategories } from './collections/ResearchCategories'

import { HomePage } from './globals/Homepage'
import { OurTeamPage } from './globals/OurTeamPage'
import { StudiesPage } from './globals/StudiesPage'
import { ResearchPage } from './globals/ResearchPage'
import { NavigationBar } from './globals/NavigationBar'
import { Footer } from './globals/Footer'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: ['en', 'zh', 'mi'],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: [Users, Media, Pages, Staff, Studies, Research, ResearchCategories],
  globals: [HomePage, OurTeamPage, StudiesPage, ResearchPage, NavigationBar, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true,
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
          accessKeyId: process.env.AWS_ACCESS_KEY || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION,
        // ... Other S3 configuration
      },
    }),
  ],
})
