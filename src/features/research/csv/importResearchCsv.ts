import { readFile } from 'node:fs/promises'
import { uploadResearch } from '@/features/research/uploadResearch.query'
import {
  buildCsvResearchIdentity,
  markMissingResearchAsCsvDeleted,
  type CsvDeletedResearchIdentities,
} from '@/features/research/researchCsvDeletionPersistence'
import { parseResearchCsv } from './parseResearchCsv'
import { buildCategoryResolver } from './resolveResearchCategories'
import type { ResearchCsvImportProgressEvent, ResearchCsvImportResult } from './types'

async function processRowsWithConcurrency<T>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<void>,
): Promise<void> {
  let nextIndex = 0

  async function worker(): Promise<void> {
    while (true) {
      const index = nextIndex++
      if (index >= items.length) return
      await fn(items[index], index)
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()))
}

export async function importResearchCsvContent(
  content: string,
  options?: {
    dryRun?: boolean
    onProgress?: (event: ResearchCsvImportProgressEvent) => void
  },
): Promise<ResearchCsvImportResult> {
  const dryRun = options?.dryRun ?? false
  const onProgress = options?.onProgress
  const { rawRows, rows } = parseResearchCsv(content)

  let createdRows = 0
  let updatedRows = 0
  let skippedRows = 0
  let failedRows = 0
  let deletedRows = 0

  const activeIdentities: CsvDeletedResearchIdentities = {
    dois: new Set(),
    fallbackKeys: new Set(),
  }

  for (const row of rows) {
    const identity = buildCsvResearchIdentity({
      title: row.title,
      doi: row.doi,
      url: row.url,
      publicationDate: row.publicationDate,
    })

    if (identity.doi) {
      activeIdentities.dois.add(identity.doi)
    } else if (identity.fallbackKey.replace(/\|/g, '').trim()) {
      activeIdentities.fallbackKeys.add(identity.fallbackKey)
    }
  }

  const resolveCategoryIds = await buildCategoryResolver(rows, dryRun)

  await processRowsWithConcurrency(rows, 5, async (row, index) => {
    try {
      if (dryRun) {
        console.log(`[DRY RUN] Would upload row ${index + 1}: ${row.title}`)
        onProgress?.({
          index: index + 1,
          total: rows.length,
          status: 'skipped',
          title: row.title,
        })
        return
      }

      const categoryIDs = resolveCategoryIds(row.categoryNames)

      const result = await uploadResearch({
        title: row.title,
        doi: row.doi,
        link: row.url,
        date: row.publicationDate,
        staffID: row.staffIds,
        categoryIDs,
      })

      if (result.status === 'created') {
        createdRows++
      } else if (result.status === 'updated') {
        updatedRows++
      } else {
        skippedRows++
      }

      console.log(`${result.status} row ${index + 1}/${rows.length}: ${row.title}`)
      onProgress?.({
        index: index + 1,
        total: rows.length,
        status:
          result.status === 'created' || result.status === 'updated' ? result.status : 'skipped',
        title: row.title,
      })
    } catch (error) {
      failedRows++
      console.error(`Failed to upload row ${index + 1}: ${row.title}`)
      console.error(error)
      onProgress?.({
        index: index + 1,
        total: rows.length,
        status: 'failed',
        title: row.title,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  })

  if (!dryRun && rows.length > 0) {
    deletedRows = await markMissingResearchAsCsvDeleted({
      activeIdentities,
      onDelete: ({ index, total, title }) => {
        onProgress?.({
          index,
          total,
          status: 'deleted',
          title,
        })
      },
    })
  }

  return {
    totalRows: rawRows.length,
    validRows: rows.length,
    uploadedRows: createdRows + updatedRows,
    createdRows,
    updatedRows,
    skippedRows,
    failedRows,
    deletedRows,
  }
}

export async function importResearchCsv(
  csvPath: string,
  options?: {
    dryRun?: boolean
  },
): Promise<ResearchCsvImportResult> {
  const content = await readFile(csvPath, 'utf8')

  return importResearchCsvContent(content, options)
}

// Backwards-compatible aliases for older imports.
export const uploadResearchCsvContent = importResearchCsvContent
export const uploadResearchCsv = importResearchCsv
