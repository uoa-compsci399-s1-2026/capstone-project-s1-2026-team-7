import ContactInput from './ContactInput'
import MainButton from '../../MainButton'

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
    buttonTitle: string
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

      <MainButton title={content.buttonTitle} variant="primary" />
    </form>
  )
}
