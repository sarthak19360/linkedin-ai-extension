import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef, useState } from "react"
import { createRoot } from "react-dom/client"

import Icon from "~components/Icon"
import Modal from "~components/Modal"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const messageBoxRef = useRef<HTMLDivElement | null>(null)
  const modalContainerRef = useRef<HTMLDivElement | null>(null)

  const handleModalSubmit = (response: string) => {
    setMessage(response)
    setIsModalOpen(false)

    if (messageBoxRef.current) {
      const messageBox = messageBoxRef.current
      const para = document.createElement("p")
      para.innerHTML = response
      messageBox.prepend(para)
    }
  }

  useEffect(() => {
    const targetMessageBox = () => {
      const messageBox = document.querySelector<HTMLDivElement>(
        ".msg-form__contenteditable"
      )
      const placeholder = document.querySelector<HTMLDivElement>(
        ".msg-form__placeholder"
      )

      if (messageBox) {
        messageBoxRef.current = messageBox

        const iconContainer = document.createElement("div")
        iconContainer.id = "ai-icon"
        iconContainer.style.position = "absolute"
        iconContainer.style.bottom = "5px"
        iconContainer.style.right = "5px"
        messageBox.style.position = "relative"
        messageBox.appendChild(iconContainer)

        const root = createRoot(iconContainer)
        root.render(<Icon onClick={() => setIsModalOpen(true)} />)
        iconContainer.classList.remove("flex")
        iconContainer.classList.add("hidden")

        messageBox.onfocus = () => {
          placeholder.style.display = "none"
          iconContainer.classList.remove("hidden")
          iconContainer.classList.add("flex")
        }

        messageBox.onblur = () => {
          setTimeout(() => {
            iconContainer.classList.remove("flex")
            iconContainer.classList.add("hidden")
          }, 500)
        }

        modalContainerRef.current = document.createElement("div")
        document.body.appendChild(modalContainerRef.current)
      }
    }

    const timeoutId = setTimeout(targetMessageBox, 3000)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  )
}

export default PlasmoOverlay
