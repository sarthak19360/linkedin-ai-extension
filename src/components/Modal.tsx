import { useState } from "react"

interface ModalProps {
  isOpen: Boolean
  onClose: () => void
  onSubmit: (response: string) => void
  className?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")

  if (!isOpen) return null
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setResponse(
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    )
  }

  return (
    <div
      onClick={() => onClose()}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">AI Assistant</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter your prompt"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Generate
          </button>
        </form>
        {response && (
          <div className="mt-4">
            <p className="mb-4">{response}</p>
            <div className="flex justify-between">
              <button
                onClick={() => onSubmit(response)}
                className="bg-green-500 text-white px-4 py-2 rounded">
                Insert
              </button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded">
                Regenerate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
