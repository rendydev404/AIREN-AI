"use client"

import { useEffect, useRef, useState, useId } from 'react'
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
  const [displayedMessage, setDisplayedMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const uniqueId = useId() // Stable ID for hydration safety
  const typingSpeed = 15 // ms per char

  // Effect to handle typewriter animation
  useEffect(() => {
    // If not AI, or is loading, or special bubble types, just show full message immediately
    if (sender !== 'ai' || isLoading || isCodeBubble || isActionBubble || imageUrl) {
      setDisplayedMessage(message)
      setIsTyping(false)
      return
    }

    // If message is same as displayed, do nothing
    if (message === displayedMessage) {
      return
    }

    // Start typing
    setIsTyping(true)
    let currentIndex = 0

    if (displayedMessage.length > message.length) {
      setDisplayedMessage("")
      currentIndex = 0
    } else {
      currentIndex = displayedMessage.length
    }

    const intervalId = setInterval(() => {
      if (currentIndex < message.length) {
        const chunk = message.slice(currentIndex, currentIndex + 2)
        setDisplayedMessage((prev) => prev + chunk)
        currentIndex += 2
      } else {
        setDisplayedMessage(message)
        setIsTyping(false)
        clearInterval(intervalId)
      }
    }, typingSpeed)

    return () => clearInterval(intervalId)
  }, [message, sender, isLoading, isCodeBubble, isActionBubble, imageUrl])

  const handleCopyCode = (codeId: string) => {
    const codeElement = document.getElementById(codeId)
    if (codeElement) {
      const codeText = codeElement.textContent || ''
      if (!codeText.trim()) {
        alert('Tidak ada kode untuk disalin.')
        return
      }

      navigator.clipboard.writeText(codeText).then(() => {
        const copyBtn = document.getElementById(`copy-btn-${uniqueId}`)
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

  const renderImage = () => {
    if (!imageUrl) return null
    return (
      <div className="p-1 bg-[var(--text-primary)] inline-block mb-3">
        <img
          src={imageUrl}
          alt="Gambar terkirim"
          className="sent-image block border-2 border-[var(--text-primary)] cursor-pointer hover:opacity-90"
          style={{ imageRendering: 'pixelated', maxWidth: '100%', height: 'auto' }}
          onClick={() => onImageClick?.(imageUrl)}
        />
      </div>
    )
  }

  const renderMessageContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center gap-1 my-2 px-2 h-6">
          <div className="w-2 h-2 bg-[var(--text-primary)] animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-[var(--text-primary)] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-[var(--text-primary)] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      )
    }

    if (isCodeBubble && codeContent) {
      const codeBlockId = `code-block-${uniqueId}`

      return (
        <div className="ai-code-bubble-container mt-2 max-w-full overflow-hidden">
          <div className="ai-code-bubble-header flex justify-between items-center mb-2 border-b-2 border-white/20 pb-1 bg-black/20 p-2">
            <span className="ai-code-language-tag px-2 py-0.5 text-xs font-bold uppercase">{codeLang || 'CODE'}</span>
            <button
              className="ai-code-copy-button pixel-btn !py-1 !px-2 !text-[10px] sm:!text-xs"
              id={`copy-btn-${uniqueId}`}
              onClick={() => handleCopyCode(codeBlockId)}
            >
              <i className="fas fa-copy"></i> COPY
            </button>
          </div>
          <div className="relative overflow-x-auto p-2 bg-[#0d1117]">
            <pre className="ai-code-block text-xs sm:text-sm md:text-base font-mono leading-relaxed" id={codeBlockId}>
              <code className="whitespace-pre">{escapeHtml(codeContent)}</code>
            </pre>
          </div>
        </div>
      )
    }

    if (isActionBubble && actionButtonId && actionButtonText) {
      return (
        <>
          {message && <div dangerouslySetInnerHTML={{ __html: message.replace(/\n/g, '<br>') }} />}
          <button
            id={actionButtonId}
            className="ai-action-button pixel-btn mt-3 w-full sm:w-auto"
            onClick={() => onActionClick?.(actionData)}
          >
            <i className="fas fa-bolt mr-2"></i>
            {actionButtonText}
          </button>
        </>
      )
    }

    // Standard Text Message (User or AI)
    let contentHtml = ''
    if (sender === 'user') {
      contentHtml = message.replace(/\n/g, '<br>')
    } else {
      contentHtml = (displayedMessage || '')
        .replace(/\n/g, '<br>')
        .replace(/```([\s\S]*?)```/g, '<code class="bg-black/20 px-1 border border-black/10 font-mono text-sm">$1</code>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code class="bg-black/20 px-1 border border-black/10 font-mono text-sm">$1</code>')

      if (isTyping) {
        contentHtml += '<span class="inline-block w-2 h-4 align-middle bg-[var(--accent-primary)] ml-1 animate-pulse"></span>'
      }
    }

    return (
      <div
        dangerouslySetInnerHTML={{ __html: contentHtml }}
        className="leading-relaxed tracking-wide font-['VT323'] text-lg sm:text-xl md:text-2xl"
      />
    )
  }

  return (
    <div
      ref={bubbleRef}
      className={`flex chat-bubble w-full mb-4 ${sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`relative p-3 sm:p-4 md:p-5 max-w-[85vw] sm:max-w-[80%] md:max-w-[70%] break-words shadow-md transition-all ${sender === 'user' ? 'user-bubble bg-[var(--bubble-user-bg)] text-[var(--bubble-user-text)]' : 'ai-bubble bg-[var(--bubble-ai-bg)] text-[var(--bubble-ai-text)]'
          }`}
        style={{
          boxShadow: '4px 4px 0px rgba(0,0,0,0.15)',
          border: '2px solid var(--border-color)',
          fontFamily: "'VT323', monospace", // Enforce pixel font globally on bubble
        }}
      >
        {renderImage()}
        {renderMessageContent()}
      </div>
    </div>
  )
}