"use client"

import { ChatMessage, ExportChatProps } from '@/types'

export function ExportChat({ chatHistory, disabled = false }: ExportChatProps) {
  const exportToText = () => {
    if (chatHistory.length === 0) {
      alert('Tidak ada riwayat percakapan untuk diekspor.')
      return
    }

    let conversationText = "=== AIREN-AI Chat History ===\n\n"
    chatHistory.forEach((entry, index) => {
      const speaker = entry.role === 'user' ? 'Pengguna' : 'AIREN-AI'
      let textPart = ""
      entry.parts.forEach(part => {
        if(part.text) textPart += part.text + " "
        if(part.inlineData) textPart += "[GAMBAR DIKIRIM OLEH PENGGUNA] "
      })
      conversationText += `${index + 1}. ${speaker}: ${textPart.trim()}\n\n`
    })

    const blob = new Blob([conversationText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `airen-ai-chat-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportToJSON = () => {
    if (chatHistory.length === 0) {
      alert('Tidak ada riwayat percakapan untuk diekspor.')
      return
    }

    const exportData = {
      title: "AIREN-AI Chat History",
      date: new Date().toISOString(),
      messages: chatHistory
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `airen-ai-chat-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex space-x-2">
      <button
        onClick={exportToText}
        disabled={disabled || chatHistory.length === 0}
        className="ai-action-button text-xs sm:text-sm py-1.5 px-2.5 sm:py-2 sm:px-3"
        title="Export as Text"
      >
        <i className="fas fa-file-alt"></i> TXT
      </button>
      <button
        onClick={exportToJSON}
        disabled={disabled || chatHistory.length === 0}
        className="ai-action-button text-xs sm:text-sm py-1.5 px-2.5 sm:py-2 sm:px-3"
        title="Export as JSON"
      >
        <i className="fas fa-file-code"></i> JSON
      </button>
    </div>
  )
} 