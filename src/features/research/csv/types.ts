export type ResearchCsvRow = {
  title: string
  doi: string
  url: string
  publicationDate: string
  staffNames?: string
  staffIds: string
  orcidIds?: string
  categories?: string
}

export type ParsedResearchRow = {
  title: string
  doi: string
  url: string
  publicationDate: string
  staffIds: number[]
  categoryNames: string[]
}

export type ResearchCsvImportProgressEvent = {
  index: number
  total: number
  status: 'created' | 'updated' | 'skipped' | 'failed' | 'deleted'
  title: string
  error?: string
}

export type ResearchCsvImportResult = {
  totalRows: number
  validRows: number
  uploadedRows: number
  createdRows: number
  updatedRows: number
  skippedRows: number
  failedRows: number
  deletedRows: number
}

// Backwards-compatible aliases for the old uploadResearchCsv.query.ts names.
export type UploadResearchCsvProgressEvent = ResearchCsvImportProgressEvent
export type UploadResearchCsvResult = ResearchCsvImportResult
