import React from "react"

interface IconProps {
  onClick: () => void
}

const Icon: React.FC<IconProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      contentEditable={false}
      className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
      AI
    </button>
  )
}

export default Icon
