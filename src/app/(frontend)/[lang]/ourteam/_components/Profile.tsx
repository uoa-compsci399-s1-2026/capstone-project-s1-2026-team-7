'use client'
import Image from 'next/image'
import { StaffDTO, DEFAULT_PROFILE_PIC } from '@/features/our-team'
import { getVariant } from './getVariant'

export type ProfileProps = {
  profile: StaffDTO
  variantIndex?: number
  action?: () => void
}
export function hasRealPhoto(photo?: { url: string } | null) {
  return !!photo?.url && photo.url !== DEFAULT_PROFILE_PIC.url
}

export function AvatarBlock({
  variantIndex = 0,
  rounded = 'rounded-2xl',
  photo,
}: {
  variantIndex?: number
  rounded?: string
  photo?: { url: string; alt: string } | null
}) {
  const v = getVariant(variantIndex)
  const usePhoto = hasRealPhoto(photo)

  return (
    <div
      className={`relative w-full overflow-hidden ${rounded}`}
      style={{
        backgroundColor: v.bg,
        backgroundImage: usePhoto
          ? undefined
          : `radial-gradient(${v.dotGrid} 1px, transparent 1px)`,
        backgroundSize: '14px 14px',
        aspectRatio: '1 / 1',
      }}
    >
      {usePhoto ? (
        <Image
          src={photo!.url}
          alt={photo!.alt}
          fill
          sizes="(max-width: 768px) 50vw, 320px"
          className="object-cover"
        />
      ) : (
        <>
          <span
            className="absolute h-4 w-4 rounded-full"
            style={{ backgroundColor: v.dot, top: '18%', right: '18%' }}
          />
          <span
            className="absolute rounded-full"
            style={{
              backgroundColor: v.shape,
              width: '38%',
              height: '38%',
              top: '22%',
              left: '31%',
            }}
          />
          <span
            className="absolute"
            style={{
              backgroundColor: v.shape,
              width: '70%',
              height: '45%',
              bottom: '-12%',
              left: '15%',
              borderTopLeftRadius: '9999px',
              borderTopRightRadius: '9999px',
            }}
          />
        </>
      )}
    </div>
  )
}

export default function ProfileCard({ profile, variantIndex = 0, action }: ProfileProps) {
  const { formaltitle, firstname, lastname, jobTitle, intro, photo } = profile

  return (
    <button
      type="button"
      onClick={action}
      className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
    >
      <AvatarBlock variantIndex={variantIndex} photo={photo} />

      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
          {jobTitle}
        </p>
        <h3 className="mt-1 text-lg font-bold text-[#0C0C48]">
          {formaltitle + ' '}
          {firstname} {lastname}
        </h3>
        {intro && <p className="mt-2 line-clamp-3 text-sm text-gray-600">{intro}</p>}
      </div>
    </button>
  )
}
