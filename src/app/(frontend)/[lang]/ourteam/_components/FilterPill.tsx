export default function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition ${
        active
          ? 'border-[#181851] bg-[#181851] text-white'
          : 'border-gray-200 bg-white text-[#181851] hover:border-[#181851]'
      }`}
    >
      {children}
    </button>
  )
}
