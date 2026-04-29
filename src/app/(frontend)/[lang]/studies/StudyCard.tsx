import React from 'react'
import { StudyDTO } from '@/validation/studies'
import Image from 'next/image'

export type StudyCardProps = {
  study: StudyDTO
}

function extractText(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.text) return node.text
  if (node.children) return node.children.map(extractText).join('')
  return ''
}

export default function StudyCard({ study }: StudyCardProps) {
  return (
    <a href={`studies/${study.slug}`}>
      <div
        className="relative overflow-hidden
    xl:w-219 xl:h-73.5
    md:w-[547.38px] md:h-[179.21px]
    w-64.75 h-[179.35px]
    rounded-[27px] xl:rounded-[45px]"
      >
        <Image src={study.banner.url} alt={study.banner.alt} fill className="object-cover" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1
            className="text-white font-bold leading-tight
            xl:text-[28.07px]
            md:text-[17.11px]
            text-[17.11px]"
          >
            {study.title}
          </h1>

          <h2
            className="text-white font-normal leading-tight
            xl:text-[24px] xl:w-2xl xl:mt-2.75
            md:text-[14.63px] md:w-102.5 md:mt-1.75
            text-[14.63px] w-49 mt-1.75
            line-clamp-2"
          >
            {extractText(study.description?.root)}
          </h2>
        </div>
      </div>
    </a>
  )
}
