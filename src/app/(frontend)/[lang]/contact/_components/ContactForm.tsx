import ContactInput from './ContactInput'

type ContactFormProps = {
  content: {
    name: string
    email: string
    phone: string
    message: string
    namePlaceholder: string
    emailPlaceholder: string
    phonePlaceholder: string
    messagePlaceholder: string
    button: string
  }
}

export default function ContactForm({ content }: ContactFormProps) {
  return (
    <form className="flex w-full max-w-140 flex-col gap-7">
      <ContactInput label={content.name} name="name" placeholder={content.namePlaceholder} />

      <ContactInput
        label={content.email}
        name="email"
        type="email"
        placeholder={content.emailPlaceholder}
      />

      <ContactInput
        label={content.phone}
        name="phone"
        type="tel"
        placeholder={content.phonePlaceholder}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[20px] font-semibold text-black">
          {content.message}
        </label>

        <textarea
          id="message"
          name="message"
          placeholder={content.messagePlaceholder}
          rows={6}
          className="w-full resize-none rounded-xl bg-[#D9D9D9] px-6 py-4 text-[18px] text-black outline-none placeholder:text-[#8A8A8A] focus:ring-2 focus:ring-[#0C0C48]"
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-fit rounded-xl bg-[#0C0C48] px-7 py-4 text-[20px] font-medium text-white transition hover:opacity-90"
      >
        {content.button}
      </button>
    </form>
  )
}
