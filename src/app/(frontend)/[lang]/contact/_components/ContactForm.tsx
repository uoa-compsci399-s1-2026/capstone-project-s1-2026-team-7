'use client'

import { useActionState, useEffect, useRef } from 'react'
import ContactInput from './ContactInput'
import MainButton from '../../_components/MainButton'
import type { EnquiryTagDTO } from '@/validation/contact/contact.schema'
import { type ContactFormState, contactFormInitialState } from '@/types/contact'

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
    enquiryTypeLabel: string
    enquiryTypePlaceholder: string
    buttonTitle: string
  }
  tags: EnquiryTagDTO[]
  action: (prev: ContactFormState, formData: FormData) => Promise<ContactFormState>
}

export default function ContactForm({ content, tags, action }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(action, contactFormInitialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="flex w-full max-w-140 flex-col gap-7">
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
        <label htmlFor="enquiryTagId" className="text-[20px] font-semibold text-black">
          {content.enquiryTypeLabel}
        </label>

        <select
          id="enquiryTagId"
          name="enquiryTagId"
          required
          defaultValue=""
          className="h-13 w-full rounded-xl bg-[#D9D9D9] px-6 text-[18px] text-black outline-none focus:ring-2 focus:ring-[#0C0C48]"
        >
          <option value="" disabled>
            {content.enquiryTypePlaceholder}
          </option>
          {tags.map((tag) => (
            <option key={tag.id} value={String(tag.id)}>
              {tag.label}
            </option>
          ))}
        </select>
      </div>

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

      {state.status === 'success' && (
        <p
          role="status"
          aria-live="polite"
          className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[16px] text-green-800"
        >
          {state.message}
        </p>
      )}

      {state.status === 'error' && (
        <p
          role="alert"
          aria-live="assertive"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[16px] text-red-800"
        >
          {state.message}
        </p>
      )}

      <MainButton
        title={isPending ? 'Sending…' : content.buttonTitle}
        variant="primary"
        type="submit"
        disabled={isPending}
        aria-disabled={isPending}
      />
    </form>
  )
}
