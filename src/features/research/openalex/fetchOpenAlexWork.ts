import { normalizeDoi, throwIfAborted } from '@/features/research/orcid/utils'
import type { OpenAlexWork } from './types'

type FetchOpenAlexWorkOptions = {
  signal?: AbortSignal
}

const workCache = new Map<string, Promise<OpenAlexWork | null>>()
let warnedAboutMissingApiKey = false

function getOpenAlexApiKey(): string | null {
  return process.env.OPENALEX_API_KEY?.trim() || null
}

function buildOpenAlexWorkUrl(doi: string, apiKey: string): string {
  const encodedDoi = encodeURIComponent(doi)
  const url = new URL(`https://api.openalex.org/works/doi:${encodedDoi}`)

  url.searchParams.set('api_key', apiKey)
  url.searchParams.set('select', 'id,doi,title,display_name,primary_topic,topics,keywords')

  return url.toString()
}

async function fetchOpenAlexWorkByNormalizedDoi(
  normalizedDoi: string,
  options?: FetchOpenAlexWorkOptions,
): Promise<OpenAlexWork | null> {
  throwIfAborted(options?.signal)

  const apiKey = getOpenAlexApiKey()

  if (!apiKey) {
    if (!warnedAboutMissingApiKey) {
      console.warn(
        'OPENALEX_API_KEY is not set. Skipping OpenAlex category suggestions and using title keyword fallback only.',
      )
      warnedAboutMissingApiKey = true
    }

    return null
  }

  const response = await fetch(buildOpenAlexWorkUrl(normalizedDoi, apiKey), {
    signal: options?.signal,
    headers: {
      Accept: 'application/json',
    },
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch OpenAlex work for DOI ${normalizedDoi}: ${response.status} ${response.statusText}`,
    )
  }

  return (await response.json()) as OpenAlexWork
}

export async function fetchOpenAlexWorkByDoi(
  doi: string | null | undefined,
  options?: FetchOpenAlexWorkOptions,
): Promise<OpenAlexWork | null> {
  const normalizedDoi = normalizeDoi(doi)

  if (!normalizedDoi) {
    return null
  }

  const cached = workCache.get(normalizedDoi)

  if (cached) {
    return cached
  }

  const promise = fetchOpenAlexWorkByNormalizedDoi(normalizedDoi, options).catch((error) => {
    workCache.delete(normalizedDoi)
    throw error
  })

  workCache.set(normalizedDoi, promise)

  return promise
}
