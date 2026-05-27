import type { StaffDTO } from '@/features/our-team/staff.schema'
import { getStaff } from '@/features/our-team/getStaff.query'
import { getOrcidList, compareEntries, getData } from './input'
import { buildCsvRows, convertToCsv } from './output'
import { getEnabledCategories } from './getcategories'
import {
  CsvResearchRow,
  nameWithORcid,
  PerPersonOutputType,
  ResearchExportProgressOptions,
} from './types'

function throwIfAborted(signal?: AbortSignal): void {
  if (!signal?.aborted) return

  const error = new Error('Export cancelled.')
  error.name = 'AbortError'
  throw error
}

function reportProgress(
  options: ResearchExportProgressOptions | undefined,
  event: Parameters<NonNullable<ResearchExportProgressOptions['onProgress']>>[0],
): void {
  const progress = Math.max(0, Math.min(100, Math.round(event.progress)))

  options?.onProgress?.({
    ...event,
    progress,
  })
}

export async function getResearchExportRows(
  options?: ResearchExportProgressOptions,
): Promise<CsvResearchRow[]> {
  throwIfAborted(options?.signal)
  reportProgress(options, {
    progress: 0,
    stage: 'staff',
    status: 'Loading staff records.',
  })

  const staff: StaffDTO[] = await getStaff()
  throwIfAborted(options?.signal)
  reportProgress(options, {
    progress: 8,
    stage: 'staff',
    status: 'Staff records loaded.',
  })

  const people: nameWithORcid[] = await getOrcidList(staff)
  reportProgress(options, {
    progress: 10,
    stage: 'orcid',
    status: people.length
      ? `Fetching ORCID publications for ${people.length} staff member${people.length === 1 ? '' : 's'}.`
      : 'No staff ORCID values found.',
    current: 0,
    total: people.length,
  })

  const data: PerPersonOutputType[] = await getData(people, {
    signal: options?.signal,
    onPersonComplete: ({ index, total, person }) => {
      const progress = total === 0 ? 65 : 10 + (index / total) * 55

      reportProgress(options, {
        progress,
        stage: 'orcid',
        status: `Fetched ORCID publications for ${person.name} (${index}/${total}).`,
        current: index,
        total,
      })
    },
  })

  throwIfAborted(options?.signal)
  reportProgress(options, {
    progress: 66,
    stage: 'rows',
    status: 'Combining duplicate research entries.',
  })

  const cleanedResearch = compareEntries(data)
  const rows = buildCsvRows(cleanedResearch, people)

  reportProgress(options, {
    progress: 72,
    stage: 'rows',
    status: `Built ${rows.length} CSV row${rows.length === 1 ? '' : 's'}.`,
  })

  reportProgress(options, {
    progress: 75,
    stage: 'categories',
    status: 'Checking research categories.',
    current: 0,
    total: rows.length,
  })

  const categoryResults = await getEnabledCategories(rows, {
    signal: options?.signal,
    onProgress: ({ current, total }) => {
      const progress = total === 0 ? 90 : 75 + (current / total) * 15

      reportProgress(options, {
        progress,
        stage: 'categories',
        status: `Processed category suggestions (${current}/${total}).`,
        current,
        total,
      })
    },
  })

  throwIfAborted(options?.signal)
  reportProgress(options, {
    progress: 92,
    stage: 'categories',
    status: 'Applying categories to export rows.',
  })

  return rows.map((row) => {
    const matchingCategoryResult = categoryResults.find((result) => result.title === row.title)

    return {
      ...row,
      categories: matchingCategoryResult?.categories.join('; ') ?? '',
    }
  })
}

export async function getResearchExportCsv(
  options?: ResearchExportProgressOptions,
): Promise<{ csv: string; rows: CsvResearchRow[] }> {
  const rows = await getResearchExportRows(options)

  throwIfAborted(options?.signal)
  reportProgress(options, {
    progress: 94,
    stage: 'csv',
    status: 'Converting rows to CSV.',
  })

  return {
    rows,
    csv: `${convertToCsv(rows)}\n`,
  }
}
