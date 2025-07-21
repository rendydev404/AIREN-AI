import { useEffect } from 'react'

interface KeyboardShortcutsProps {
  onSendMessage: () => void
  onToggleTheme: () => void
  onOpenCodingCanvas: () => void
  onOpenDeveloperInfo: () => void
  onSummarize: () => void
  onClearChat: () => void
  disabled?: boolean
}

export function useKeyboardShortcuts({
  onSendMessage,
  onToggleTheme,
  onOpenCodingCanvas,
  onOpenDeveloperInfo,
  onSummarize,
  onClearChat,
  disabled = false
}: KeyboardShortcutsProps) {
  useEffect(() => {
    if (disabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in input fields
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      // Ctrl/Cmd + Enter: Send message
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault()
        onSendMessage()
      }

      // Ctrl/Cmd + T: Toggle theme
      if ((event.ctrlKey || event.metaKey) && event.key === 't') {
        event.preventDefault()
        onToggleTheme()
      }

      // Ctrl/Cmd + K: Open coding canvas
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        onOpenCodingCanvas()
      }

      // Ctrl/Cmd + I: Open developer info
      if ((event.ctrlKey || event.metaKey) && event.key === 'i') {
        event.preventDefault()
        onOpenDeveloperInfo()
      }

      // Ctrl/Cmd + S: Summarize conversation
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()
        onSummarize()
      }

      // Ctrl/Cmd + L: Clear chat
      if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
        event.preventDefault()
        if (window.confirm('Apakah Anda yakin ingin menghapus semua riwayat percakapan?')) {
          onClearChat()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onSendMessage, onToggleTheme, onOpenCodingCanvas, onOpenDeveloperInfo, onSummarize, onClearChat, disabled])
} 