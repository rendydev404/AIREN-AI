"use client"

import { useEffect, useRef } from 'react'
import { escapeHtml } from '@/lib/utils'
import { gsap } from 'gsap'
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

  useEffect(() => {
    if (bubbleRef.current) {
      try {
        gsap.fromTo(bubbleRef.current, 
          { opacity: 0, y: 30, scale: 0.9 }, 
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.65)"}
        )
      } catch (error) {
        console.warn('GSAP error in chat bubble:', error)
      }
    }
  }, [])

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
          copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!'
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy'
          }, 2000)
        }
      }).catch(err => {
        console.error('Failed to copy code: ', err)
        alert('Gagal menyalin kode. Silakan coba lagi.')
      })
    }
  }

  const renderContent = () => {
    let contentHtml = ''

    if (imageUrl) {
      contentHtml += `<img src="${imageUrl}" alt="Gambar terkirim" class="sent-image mb-2">`
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
          <div className="ai-code-bubble-container">
            <div className="ai-code-bubble-header">
              <span className="ai-code-language-tag">{codeLang || 'CODE'}</span>
              <button 
                className="ai-code-copy-button" 
                id={uniqueCopyId}
                onClick={() => handleCopyCode(codeBlockId)}
              >
                <i className="fas fa-copy"></i> Copy
              </button>
            </div>
            <pre className="ai-code-block" id={codeBlockId}>
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
              className="ai-action-button"
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
      className={`flex chat-bubble ${sender === 'user' ? 'justify-end mb-3' : 'justify-start mb-3'}`}
    >
      <div className={`rounded-xl p-3 max-w-[85vw] sm:max-w-sm md:max-w-md lg:max-w-lg text-sm shadow-lg break-words ${
        sender === 'user' ? 'user-bubble' : 'ai-bubble'
      }`}>
        {renderContent()}
      </div>
    </div>
  )
} 