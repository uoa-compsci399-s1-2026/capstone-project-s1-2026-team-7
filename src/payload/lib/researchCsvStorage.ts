import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

export type ResearchCsvStorageKind = 'exports' | 'imports'

export type StoredResearchCsv = {
  bucket: string
  key: string
}

function getS3Client(): S3Client {
  return new S3Client({
    region: process.env.S3_REGION || process.env.AWS_REGION || 'ap-southeast-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
  })
}

function sanitizeFilename(filename: string): string {
  return filename
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
}

function timestampForKey(): string {
  return new Date().toISOString().replace(/[:.]/g, '-')
}

export function buildResearchCsvS3Key(kind: ResearchCsvStorageKind, filename: string): string {
  const safeFilename = sanitizeFilename(filename) || 'research.csv'

  return `csv/research/${kind}/${timestampForKey()}-${safeFilename}`
}

export async function storeResearchCsvInS3({
  content,
  filename,
  kind,
}: {
  content: string
  filename: string
  kind: ResearchCsvStorageKind
}): Promise<StoredResearchCsv> {
  const bucket = process.env.S3_BUCKET

  if (!bucket) {
    throw new Error('S3_BUCKET is required before CSV files can be stored in S3.')
  }

  const key = buildResearchCsvS3Key(kind, filename)
  const client = getS3Client()

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: content,
      ContentType: 'text/csv; charset=utf-8',
      Metadata: {
        feature: 'research-csv-tools',
        kind,
      },
    }),
  )

  return { bucket, key }
}
