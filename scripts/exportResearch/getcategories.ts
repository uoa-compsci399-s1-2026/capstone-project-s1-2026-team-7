import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime'
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

export type CategoryArticleInput = {
  id?: string
  title: string
  doi?: string | null
  url?: string | null
  publicationDate?: string | null
}

export type CategoryResult = {
  id: string
  title: string
  categories: string[]
}

type BedrockClaudeResponse = {
  content?: {
    type: string
    text?: string
  }[]
}

const ENABLED_RESEARCH_CATEGORIES = [
  'Body composition',
  'Cardiometabolic health',
  'Clinical nutrition',
  'Energy expenditure',
  'Exercise physiology',
  'Food intake and appetite',
  'Human metabolism',
  'Obesity',
  'Public health nutrition',
  'Other',
] as const

const MODEL_ID = 'anthropic.claude-3-haiku-20240307-v1:0'

function getArticleId(article: CategoryArticleInput, index: number): string {
  if (article.id) return article.id
  if (article.doi) return article.doi
  return `${index}-${article.title.toLowerCase().trim()}`
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getCacheKey(articles: CategoryArticleInput[], categories: readonly string[]): string {
  const hash = createHash('sha256')

  hash.update(
    JSON.stringify({
      articles,
      categories,
      modelId: MODEL_ID,
    }),
  )

  return hash.digest('hex')
}

async function readCachedResult(cacheKey: string): Promise<CategoryResult[] | null> {
  const cachePath = path.resolve(process.cwd(), '.cache', 'exportResearch', `${cacheKey}.json`)

  try {
    const cached = await readFile(cachePath, 'utf8')
    return JSON.parse(cached) as CategoryResult[]
  } catch {
    return null
  }
}

async function writeCachedResult(cacheKey: string, result: CategoryResult[]): Promise<void> {
  const cacheDirectory = path.resolve(process.cwd(), '.cache', 'exportResearch')
  const cachePath = path.join(cacheDirectory, `${cacheKey}.json`)

  await mkdir(cacheDirectory, { recursive: true })
  await writeFile(cachePath, JSON.stringify(result, null, 2), 'utf8')
}

function buildPrompt(articles: CategoryArticleInput[], categories: readonly string[]): string {
  const articlesForPrompt = articles.map((article, index) => ({
    id: getArticleId(article, index),
    title: article.title,
    doi: article.doi ?? '',
    publicationDate: article.publicationDate ?? '',
  }))

  return `
You are categorising research publications for a Human Nutrition Unit website.

Choose the most relevant categories for each article.

Rules:
- Only use categories from this allowed list:
${categories.map((category) => `  - ${category}`).join('\n')}
- Return valid JSON only.
- Do not include markdown.
- Do not include explanations.
- Each article can have 1 to 3 categories.
- If unsure, use "Other".

Return this JSON shape exactly:
[
  {
    "id": "article id",
    "title": "article title",
    "categories": ["Category name"]
  }
]

Articles:
${JSON.stringify(articlesForPrompt, null, 2)}
`.trim()
}

function extractJsonArray(text: string): CategoryResult[] {
  const trimmed = text.trim()

  try {
    return JSON.parse(trimmed) as CategoryResult[]
  } catch {
    const start = trimmed.indexOf('[')
    const end = trimmed.lastIndexOf(']')

    if (start === -1 || end === -1 || end <= start) {
      throw new Error(`Bedrock did not return a JSON array: ${text}`)
    }

    return JSON.parse(trimmed.slice(start, end + 1)) as CategoryResult[]
  }
}

function validateCategories(
  results: CategoryResult[],
  allowedCategories: readonly string[],
): CategoryResult[] {
  const allowed = new Set(allowedCategories)

  return results.map((result) => ({
    ...result,
    categories: result.categories.filter((category) => allowed.has(category)),
  }))
}

async function callBedrockForCategories(
  articles: CategoryArticleInput[],
  categories: readonly string[],
): Promise<CategoryResult[]> {
  const region = process.env.S3_REGION
  const modelId = MODEL_ID

  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      'Missing AWS credentials. Add AWS_ACCESS_KEY_ID_ID/AWS_SECRET_ACCESS_KEY or AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY to .env.',
    )
  }

  const client = new BedrockRuntimeClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })

  const prompt = buildPrompt(articles, categories)

  const command = new InvokeModelCommand({
    modelId,
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 2000,
      temperature: 0,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    }),
  })

  const response = await client.send(command)
  const decodedBody = new TextDecoder().decode(response.body)
  const parsed = JSON.parse(decodedBody) as BedrockClaudeResponse

  const text = parsed.content?.find((item) => item.type === 'text')?.text

  if (!text) {
    throw new Error(`Bedrock returned no text content: ${decodedBody}`)
  }

  return validateCategories(extractJsonArray(text), categories)
}

async function processInBatches(
  articles: CategoryArticleInput[],
  categories: readonly string[],
  batchSize: number,
): Promise<CategoryResult[]> {
  const results: CategoryResult[] = []

  for (let i = 0; i < articles.length; i += batchSize) {
    const batch = articles.slice(i, i + batchSize)

    console.log(`Calling Bedrock for articles ${i + 1}-${i + batch.length}`)

    const batchResult = await callBedrockForCategories(batch, categories)

    results.push(...batchResult)

    await sleep(500)
  }

  return results
}

export async function getEnabledCategories(
  articles: CategoryArticleInput[],
  options?: {
    categories?: readonly string[]
    batchSize?: number
    useCache?: boolean
  },
): Promise<CategoryResult[]> {
  const categories = options?.categories ?? ENABLED_RESEARCH_CATEGORIES
  const batchSize = options?.batchSize ?? 20
  const useCache = options?.useCache ?? true

  if (articles.length === 0) {
    return []
  }

  const cacheKey = getCacheKey(articles, categories)

  if (useCache) {
    const cached = await readCachedResult(cacheKey)

    if (cached) {
      console.log('Using cached Bedrock category results.')
      return cached
    }
  }

  if (process.env.BEDROCK_CATEGORIES_ENABLED !== 'true') {
    console.warn(
      'Skipping Bedrock category call. Set BEDROCK_CATEGORIES_ENABLED=true to enable it.',
    )

    return articles.map((article, index) => ({
      id: getArticleId(article, index),
      title: article.title,
      categories: [],
    }))
  }

  const results = await processInBatches(articles, categories, batchSize)

  if (useCache) {
    await writeCachedResult(cacheKey, results)
  }

  return results
}
