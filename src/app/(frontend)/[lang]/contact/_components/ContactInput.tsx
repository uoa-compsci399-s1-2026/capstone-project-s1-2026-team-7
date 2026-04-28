type ContactInputProps = {
  label: string
  name: string
  placeholder: string
  type?: string
}

export default function ContactInput({
  label,
  name,
  placeholder,
  type = 'text',
}: ContactInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-[20px] font-semibold text-black">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="h-13 w-full rounded-xl bg-[#D9D9D9] px-6 text-[18px] text-black outline-none placeholder:text-[#8A8A8A] focus:ring-2 focus:ring-[#0C0C48]"
      />
    </div>
  )
}
