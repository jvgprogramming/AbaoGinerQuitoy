import type { FC } from "react"

interface removeButtonProps {
  label: string
  className?: string
  newClassName?: string
  onRemove: () => void
}

const removeButton: FC<removeButtonProps> = ({ label, className, newClassName, onRemove }) => {
  return (
    <button
      type="button"
      className={newClassName ? newClassName : `px-4 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg shadow-lg text-sm font-medium cursor-pointer ${className}`}
      onClick={onRemove}
    >
      {label}
    </button>
  )
}

export default removeButton