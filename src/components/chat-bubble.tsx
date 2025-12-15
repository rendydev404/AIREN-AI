"use client"

import { useEffect, useRef } from 'react'
import { escapeHtml } from '@/lib/utils'
import { ChatBubbleProps } from '@/types'

export function ChatBubble({
  message,
  sender,
  imageUrl,
  isLoading = false,
  isActionBubble = false,
  actionButtonId,
  actionButtonText,
  actionData,
  isCodeBubble = false,
  codeContent,
  codeLang,
  onImageClick,
  onActionClick
}: ChatBubbleProps) {
  const bubbleRef = useRef<HTMLDivElement>(null)

  // Removed GSAP animations for retro feel, or keep them simple

  const handleCopyCode = (codeId: string) => {
    const codeElement = document.getElementById(codeId)
    if (codeElement) {
      const codeText = codeElement.textContent || ''
      if (!codeText.trim()) {
        alert('Tidak ada kode untuk disalin.')
        return
      }

      navigator.clipboard.writeText(codeText).then(() => {
        const copyBtn = document.getElementById(`copy-${codeId}`)
        if (copyBtn) {
          copyBtn.innerHTML = '<i class="fas fa-check"></i> COPIED!'
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> COPY'
          }, 2000)
        }
      }).catch(err => {
        console.error('Failed to copy code: ', err)
        alert('Gagal menyalin kode.')
      })
    }
  }

  const renderContent = () => {
    let contentHtml = ''

    if (imageUrl) {
      contentHtml += `<div class="p-1 bg-[var(--text-primary)] inline-block"><img src="${imageUrl}" alt="Gambar terkirim" class="sent-image mb-2 block border-2 border-[var(--text-primary)]" style="image-rendering: pixelated; max-width: 100%; height: auto;"></div>`
    }

    if (sender === 'user') {
      contentHtml += message.replace(/\n/g, '<br>')
    } else {
      if (isLoading) {
        return (
          <div className="typing-indicator my-2 mx-auto">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )
      } else if (isCodeBubble && codeContent) {
        const uniqueCopyId = `copy-code-${Date.now()}`
        const codeBlockId = `code-block-${uniqueCopyId}`

        return (
          <div className="ai-code-bubble-container mt-2">
            <div className="ai-code-bubble-header flex justify-between items-center mb-2 border-b-2 border-white/20 pb-1">
              <span className="ai-code-language-tag px-2 py-0.5 text-xs">{codeLang || 'CODE'}</span>
              <button
                className="ai-code-copy-button pixel-btn text-xs py-1 px-2"
                id={uniqueCopyId}
                onClick={() => handleCopyCode(codeBlockId)}
              >
                <i className="fas fa-copy"></i> COPY
              </button>
            </div>
            <pre className="ai-code-block overflow-x-auto p-2" id={codeBlockId}>
              <code>{escapeHtml(codeContent)}</code>
            </pre>
          </div>
        )
      } else if (isActionBubble && actionButtonId && actionButtonText) {
        return (
          <>
            {message && <div dangerouslySetInnerHTML={{ __html: message.replace(/\n/g, '<br>') + '<br>' }} />}
            <button
              id={actionButtonId}
              className="ai-action-button pixel-btn mt-2"
              onClick={() => onActionClick?.(actionData)}
            >
              {actionButtonText}
            </button>
          </>
        )
      } else {
        contentHtml += message
          .replace(/\n/g, '<br>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
      }
    }

    return <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
  }

  return (
    <div
      ref={bubbleRef}
      className={`flex chat-bubble ${sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`p-4 max-w-[85vw] sm:max-w-sm md:max-w-md lg:max-w-lg text-lg break-words ${sender === 'user' ? 'user-bubble' : 'ai-bubble'
        }`} style={{
          imageRendering: 'pixelated',
          fontFamily: sender === 'user' ? '"VT323", monospace' : '"VT323", monospace'
        }}>
        {renderContent()}
      </div>
    </div>
  )
} 