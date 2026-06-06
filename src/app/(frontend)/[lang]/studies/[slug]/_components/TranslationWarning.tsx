import { AlertTriangle } from 'lucide-react'

type TranslationWarningProps = {
  /** Optional override text. Falls back to a default bilingual message. */
  message?: string
}

export default function TranslationWarning({ message }: TranslationWarningProps) {
  const defaultMessage =
    '此研究目前没有经过审核的中文翻译，内容以英文显示。请以英文内容为准。' +
    ' / This study has no approved Chinese translation and is shown in English. Please rely on the English content.'

  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" strokeWidth={2.5} />
      <p className="leading-relaxed">{message ?? defaultMessage}</p>
    </div>
  )
}
