const steps = [
  'early inception hypotheses',
  'protocol development',
  'ethical and regulatory approval',
  'completion of trials',
  'data analysis',
  'interpretation',
  'report writing and publication',
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
    </section>
  )
}
