import type { StaffDTO } from '@/features/our-team/staff.schema'
import { getStaff } from '@/features/our-team/getStaff.query'
import {
  buildCsvResearchIdentity,
  getCsvDeletedResearchIdentities,
} from '@/features/research/researchCsvDeletionPersistence'
import { addSuggestedCategoriesToResearchRows } from '@/features/research/categorySuggestions/suggestResearchCategories'
import { buildCsvRows, compareEntries, convertToCsv } from './buildResearchExportRows'
import { getData } from './fetchOrcidWorks'
import { getStaffOrcids } from './getStaffOrcids'
import type {
  CsvResearchRow,
  NameWithOrcid,
  PerPersonOutputType,
  ResearchExportProgressOptions,
} from './types'
import { throwIfAborted } from './utils'

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

  const people: NameWithOrcid[] = getStaffOrcids(staff)
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
    progress: 88,
    stage: 'rows',
    status: `Built ${rows.length} CSV row${rows.length === 1 ? '' : 's'}${
      excludedRows > 0
        ? ` (${excludedRows} CSV-deleted record${excludedRows === 1 ? '' : 's'} excluded)`
        : ''
    }.`,
  })

  throwIfAborted(options?.signal)
  reportProgress(options, {
    progress: 89,
    stage: 'categories',
    status:
      'Saving OpenAlex terms and applying mapped categories, with title keywords as fallback.',
    current: 0,
    total: rows.length,
  })

  const rowsWithCategories = await addSuggestedCategoriesToResearchRows(rows, {
    signal: options?.signal,
    onProgress: ({ index, total, title, categories }) => {
      const progress = total === 0 ? 94 : 89 + (index / total) * 5

      reportProgress(options, {
        progress,
        stage: 'categories',
        status: categories.length
          ? `Suggested ${categories.length} categor${categories.length === 1 ? 'y' : 'ies'} for ${title} (${index}/${total}).`
          : `No category suggestion found for ${title} (${index}/${total}).`,
        current: index,
        total,
      })
    },
  })

  return rowsWithCategories
}

export async function getResearchExportCsv(
  options?: ResearchExportProgressOptions,
): Promise<{ csv: string; rows: CsvResearchRow[] }> {
  const rows = await getResearchExportRows(options)

  throwIfAborted(options?.signal)
  reportProgress(options, {
    progress: 96,
    stage: 'csv',
    status: 'Converting rows to CSV.',
  })

  return {
    rows,
    csv: `${convertToCsv(rows)}\n`,
  }
}
