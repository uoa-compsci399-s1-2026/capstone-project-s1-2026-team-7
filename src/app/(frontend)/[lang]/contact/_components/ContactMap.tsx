type ContactMapProps = {
  src: string
}

export default function ContactMap({ src }: ContactMapProps) {
  return (
    <div>
      <iframe
        title="Human Nutrition Unit location"
        src={src}
        className="h-full min-h-100 w-full border-0 md:min-h-120"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
