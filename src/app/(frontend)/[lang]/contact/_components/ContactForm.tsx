'use client'

import { useActionState, useEffect, useRef } from 'react'
import ContactInput from './ContactInput'
import MainButton from '../../_components/MainButton'
import type { EnquiryTagDTO } from '@/features/contact/contact.schema'
import { type ContactFormState, contactFormInitialState } from '@/types/contact'
import { ChevronDown } from 'lucide-react'

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
      <ContactInput
        label={content.name}
        name="name"
        placeholder={content.namePlaceholder}
        required
      />

      <ContactInput
        label={content.email}
        name="email"
        type="email"
        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
        title="Please enter a valid email address"
        placeholder={content.emailPlaceholder}
        required
      />

      <ContactInput
        label={content.phone}
        name="phone"
        type="tel"
        inputMode="numeric"
        pattern="\d{7,15}"
        maxLength={15}
        title="Phone number must be 7–15 digits, numbers only"
        placeholder={content.phonePlaceholder}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="enquiryTagId" className="text-[20px] font-semibold text-black">
          {content.enquiryTypeLabel}
          <span aria-hidden="true" className="ml-1 text-red-600">
            *
          </span>
        </label>

        <div className="relative">
          <select
            id="enquiryTagId"
            name="enquiryTagId"
            required
            defaultValue=""
            className="h-13 w-full rounded-xl bg-white px-6 text-[18px] text-black outline-1 focus:ring-2 focus:ring-[#0C0C48] cursor-pointer appearance-none"
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
          <ChevronDown className="pointer-events-none absolute right-3 top-4.5 w-4 h-4 " />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[20px] font-semibold text-black">
          {content.message}
          <span aria-hidden="true" className="ml-1 text-red-600">
            *
          </span>
        </label>

        <textarea
          id="message"
          name="message"
          required
          placeholder={content.messagePlaceholder}
          rows={6}
          className="w-full resize-none rounded-xl bg-white px-6 py-4 text-[18px] text-black outline-1 placeholder:text-[#8A8A8A] focus:ring-2 focus:ring-[#0C0C48]"
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
