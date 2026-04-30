import Image from 'next/image'
import { Activity, ChartNoAxesCombined, UsersRound } from 'lucide-react'
import ServiceItem from './ServiceItem'

const services = [
  {
    title: 'Regulatory nutrition consultancy',
    icon: Activity,
  },
  {
    title: 'Trial protocol development',
    icon: ChartNoAxesCombined,
  },
  {
    title: 'Participant recruitment & screening',
    icon: UsersRound,
  },
]

export default function ServicesSection() {
  return (
    <section className="bg-white px-6 py-20 md:px-12 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-5xl font-bold text-[#08084F] md:text-6xl">Services</h2>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch">
          <div className="relative min-h-80 overflow-hidden rounded-[28px] md:min-h-110">
            <Image
              src="/services-image.svg"
              alt="Researcher viewing medical scans on a tablet"
              fill
              className="object-cover"
            />
          </div>

          <div className="rounded-[28px] bg-[#E7E9F8] px-8 py-8 text-black md:px-10 md:py-10">
            <p className="text-xl font-bold leading-snug md:text-2xl">
              A range of expertise can be found at the Unit, both in academic and commercially
              funded areas of human nutrition research.
            </p>

            <p className="mt-8 text-lg leading-snug md:text-2xl">
              Drawing on national and international expertise, the research team provides the skills
              and capabilities to carry out nutrition studies from early inception through to
              completion.
            </p>

            <p className="mt-8 text-lg leading-snug md:text-2xl">
              The Unit provides a venue for commercial and investigator-led clinical studies across
              a range of nutrition specialties.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-8">
          {services.map((service) => (
            <ServiceItem key={service.title} title={service.title} icon={service.icon} />
          ))}
        </div>
      </div>
    </section>
  )
}
