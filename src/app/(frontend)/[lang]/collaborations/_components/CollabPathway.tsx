const steps = [
  'Early inception hypotheses',
  'Protocol development',
  'Ethical and regulatory approval',
  'Completion of trials',
  'Data analysis',
  'Interpretation',
  'Report writing and publication',
]

export default function CollabPathway() {
  return (
    <section className="max-w-screen-lg mx-auto px-4 mt-8">
      <ul className="text-gray-700">
        {steps.map((step) => (
          <li key={step} className="flex items-start gap-2 pl-4">
            <span className="text-blue-600 font-bold">•</span>
            <span>{step}</span>
          </li>
        ))}
      </ul>

      <p className="text-gray-700 pt-10">
        The Unit ensures compliance with Good Clinical Practice, up to the level of ICH GCP where
        required, and has experience of and welcomes independent trial monitoring and audit
        processes.
      </p>
    </section>
  )
}
