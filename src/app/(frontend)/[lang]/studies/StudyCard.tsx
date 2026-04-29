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
    <div
      className="flex flex-col justify-items-center
    xl:w-219 xl:h-73.5
    md:w-[547.38px] md:h-[179.21px]
    w-64.75 h-[179.35px]"
    >
      <div
        className="container justify-items-center
      xl:w-219 xl:h-73.5 xl:rounded-[44.89px]
      md:w-[547.38px] md:h-[179.21px] md:rounded-[27.36px]
      w-64.75 h-[179.35px] rounded-[27.36px] bg-blue-950"
      >
        <h1
          className="flex flex-wrap text-white font-bold leading-tight
      xl:text-[28.07px] xl:mt-[95.39px]
      md:text-[17.11px] md:mt-[57.68px]
      text-[17.11px] mt-[57.68px]"
        >
          {study.title}
        </h1>
        <h2
          className="text-center text-white font-normal leading-tight
          xl:text-[24px] xl:w-2xl xl:mt-2.75
          md:text-[14.63px] md:w-102.5 md:mt-1.75
          text-[14.63px] w-49 mt-1.75
          line-clamp-2"
        >
          {extractText(study.description?.root)}
        </h2>
      </div>
    </div>
  )
}
