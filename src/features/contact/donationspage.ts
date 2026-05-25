import { getPayloadClient } from '@/lib/payload'
import type { Lang } from '@/types/lang'
import { DonationsPageDTO, DonationsPageDTOSchema } from '@/features/donations/donationsPage.schema'

export async function getDonationsPage(locale: Lang = 'en'): Promise<DonationsPageDTO> {
  const payload = await getPayloadClient()

  const data = await payload.findGlobal({
    slug: 'donations-page',
    locale,
    fallbackLocale: 'en',
    depth: 2,
  })

  return DonationsPageDTOSchema.parse(data)
}
