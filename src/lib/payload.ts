import config from '@payload-config'
import { getPayload } from 'payload'
import type { Payload } from 'payload'

let payloadPromise: Promise<Payload> | null = null

export function getPayloadClient(): Promise<Payload> {
  if (!payloadPromise) {
    payloadPromise = getPayload({ config })
  }
  return payloadPromise
}