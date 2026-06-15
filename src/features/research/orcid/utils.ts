export function throwIfAborted(signal?: AbortSignal): void {
  if (!signal?.aborted) return

  const error = new Error('Export cancelled.')
  error.name = 'AbortError'
  throw error
}

export function normalizeDoi(doi: string | null | undefined): string | null {
  if (!doi) return null

  return doi
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, '')
    .replace(/^doi:/, '')
}

export function getDatePrecisionScore(date: string | null): number {
  if (!date) return 0

  const parts = date.split('-')

  if (parts.length === 3) return 3
  if (parts.length === 2) return 2
  if (parts.length === 1) return 1

  return 0
}

export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      const error = new Error('Export cancelled.')
      error.name = 'AbortError'
      reject(error)
      return
    }

    const timeout = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, ms)

    const onAbort = () => {
      clearTimeout(timeout)
      const error = new Error('Export cancelled.')
      error.name = 'AbortError'
      reject(error)
    }

    signal?.addEventListener('abort', onAbort, { once: true })
  })
}
