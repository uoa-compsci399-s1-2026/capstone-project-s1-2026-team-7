import Image from 'next/image'

export function HNUIcon() {
  return (
    <Image
      src="/HNU%20logo%20HD.png"
      alt="HNU"
      width={120}
      height={90} // tweak width/height here to fit
    />
  )
}

export default HNUIcon
