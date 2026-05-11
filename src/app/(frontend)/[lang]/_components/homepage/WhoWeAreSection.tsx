import Image from 'next/image'

export default function WhoWeAreSection() {
  return (
    <section className="bg-white px-[26px] py-10 md:px-8 md:py-20 lg:px-12">
      <div className="mx-auto w-full max-w-[1150px]">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[42%_52%] md:gap-[6%]">
          {/* Text - first on mobile, right on desktop */}
          <div className="order-1 text-left md:order-2">
            <div className="w-full md:max-w-none">
              <h2 className="text-[16px] leading-tight font-extrabold text-[#08084f] sm:text-xl md:text-3xl lg:text-4xl">
                Who We Are
              </h2>

              <div className="mt-4 h-[3px] w-16 rounded-full bg-[#08084f] md:h-1" />

              <div className="mt-6 space-y-5 text-[10px] leading-snug font-normal text-[#08084f] sm:text-sm md:text-base lg:text-lg">
                <p>
                  The HNU is a premier research facility within the University of Auckland,
                  distinguished as the only residential nutrition unit in Australasia.
                </p>

                <p>
                  Our specialized environment allows for the characterization of diverse populations
                  through safety and efficacy trials that are analogous to pharmaceutical-grade
                  clinical standards.
                </p>
              </div>
            </div>
          </div>

          {/* Image - second on mobile, left on desktop */}
          <div className="order-2 md:order-1">
            <div className="relative mx-auto aspect-[296/192] w-full overflow-hidden rounded-[10px] md:mx-0 md:aspect-[481/386] md:rounded-2xl">
              <Image
                src="/who-we-are.png"
                alt="Researchers working with a participant in the Human Nutrition Unit"
                fill
                sizes="(max-width: 768px) calc(100vw - 52px), 42vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
