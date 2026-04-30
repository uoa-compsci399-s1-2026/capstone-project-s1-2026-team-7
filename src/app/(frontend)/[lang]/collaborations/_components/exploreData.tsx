import type { JSX } from 'react'

export type Tab = 'Academic' | 'Industry' | 'Funding'

export const exploreContent: Record<Tab, JSX.Element> = {
  Academic: (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-[#0C0C48]">Academic Collaborations</h2>
      <p>
        Academic collaborations contribute to nutrition research within an academic environment.
        Partnerships include Schools and Faculties within the University of Auckland, Wellington
        Medical School, University of Otago, and international collaborations in Australia, Japan,
        and Hong Kong.
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Dairy bioactives and health — LactoPharma consortium</li>
        <li>Marine polysaccharide Chitosan — University of Queensland</li>
        <li>Omega‑3 fatty acids — George Institute, Australia</li>
        <li>Adipokynes in obesity — University of Hong Kong</li>
      </ul>
    </div>
  ),

  Industry: (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-[#0C0C48]">Industry Collaboration</h2>
      <p>The Unit provides independent expertise for industry collaboration.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Pharmaceutical — diabetic cardiomyopathy therapeutics</li>
        <li>Food — butter fat and cardiovascular risk</li>
        <li>Food components — dairy lipids & proteins</li>
        <li>Food ingredients — barley β‑glucan</li>
        <li>Nutraceuticals — Chitosan; Omega‑3</li>
      </ul>
    </div>
  ),

  Funding: (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-[#0C0C48]">Funding</h2>
      <p>The Unit receives highly competitive grant and commercial funding.</p>
      <h3 className="font-semibold">Grant Funding</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>High‑Value Nutrition</li>
        <li>The Riddet Institute</li>
        <li>MBIE</li>
        <li>Health Research Council NZ</li>
      </ul>
    </div>
  ),
}
