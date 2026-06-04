import { FileText, Download } from 'lucide-react'

type DownloadPdfCardProps = {
  pdfUrl: string | null
  heading: string
  fileLabel: string
  fileSubLabel: string
  buttonLabel: string
  helperText: string
}

export default function DownloadPdfCard({
  pdfUrl,
  heading,
  fileLabel,
  fileSubLabel,
  buttonLabel,
  helperText,
}: DownloadPdfCardProps) {
  if (!pdfUrl) return null

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-gray-600" strokeWidth={2.5} />
        <h3 className="text-sm font-bold text-[#05083D]">{heading}</h3>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-gray-600">{helperText}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
        <div className="flex min-w-0 flex-1 basis-40 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium leading-snug text-[#05083D]">{fileLabel}</p>
            <p className="text-xs text-gray-400">{fileSubLabel}</p>
          </div>
        </div>

        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Download className="h-3.5 w-3.5" />
          {buttonLabel}
        </a>
      </div>
    </div>
  )
}
