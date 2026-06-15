import type { StaffDTO } from '@/features/our-team/staff.schema'
import { getStaff } from '@/features/our-team/getStaff.query'
import { getOrcidList, compareEntries, getData } from './input'
import { buildCsvRows, convertToCsv } from './output'
import {
  buildCsvResearchIdentity,
  getCsvDeletedResearchIdentities,
} from '@/features/research/researchCsvDeletionPersistence'
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
    progress: 80,
    stage: 'rows',
    status: 'Combining duplicate research entries.',
  })

  const cleanedResearch = compareEntries(data)
  const unfilteredRows = buildCsvRows(cleanedResearch, people)
  const deletedIdentities = await getCsvDeletedResearchIdentities()
  const rows = unfilteredRows.filter((row) => {
    const identity = buildCsvResearchIdentity({
      title: row.title,
      doi: row.doi,
      url: row.url,
      publicationDate: row.publicationDate,
    })

    if (identity.doi) {
      return !deletedIdentities.dois.has(identity.doi)
    }

    return !deletedIdentities.fallbackKeys.has(identity.fallbackKey)
  })
  const excludedRows = unfilteredRows.length - rows.length

  reportProgress(options, {
    progress: 92,
    stage: 'rows',
    status: `Built ${rows.length} CSV row${rows.length === 1 ? '' : 's'}${
      excludedRows > 0
        ? ` (${excludedRows} CSV-deleted record${excludedRows === 1 ? '' : 's'} excluded)`
        : ''
    }.`,
  })

  return rows.map((row) => ({ ...row, categories: '' }))
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
