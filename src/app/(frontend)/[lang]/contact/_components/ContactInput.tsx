type ContactInputProps = {
  label: string
  name: string
  placeholder: string
  type?: string
  required?: boolean
  pattern?: string
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'decimal' | 'search' | 'url' | 'none'
  title?: string
  maxLength?: number
}

export default function ContactInput({
  label,
  name,
  placeholder,
  type = 'text',
  required = false,
  pattern,
  inputMode,
  title,
  maxLength,
}: ContactInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-[20px] font-semibold text-black">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-red-600">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        inputMode={inputMode}
        title={title}
        maxLength={maxLength}
        className="h-13 w-full rounded-xl bg-white px-6 text-[18px] text-black outline-1 placeholder:text-[#8A8A8A] focus:ring-2 focus:ring-[#0C0C48]"
      />
    </div>
  )
}
