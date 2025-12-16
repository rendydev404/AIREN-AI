"use client"

import { useEffect, useState } from 'react'
import { ModalProps } from '@/types'
import { createPortal } from 'react-dom'

export function Modal({ isOpen, onClose, title, children, className = "" }: ModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!mounted) return null
  if (!isOpen) return null

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 modal-backdrop animate-in fade-in duration-200 ${className}`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="pixel-box w-[95%] sm:w-full max-w-lg flex flex-col max-h-[90vh] shadow-2xl animate-in zoom-in-95 duration-200"
        style={{
          boxShadow: '8px 8px 0px rgba(0,0,0,0.5)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Retro Title Bar */}
        <div className="flex justify-between items-center p-3 sm:p-4 border-b-2 sm:border-b-4 border-[var(--border-color)] bg-[var(--bg-color)] shrink-0">
          <h3
            id="modal-title"
            className="text-sm sm:text-base md:text-lg font-bold uppercase truncate pr-4 text-[var(--accent-primary)] font-['Press_Start_2P'] leading-relaxed"
          >
            {title}
          </h3>

          <button
            onClick={onClose}
            className="pixel-btn !p-2 !min-w-[32px] !min-h-[32px] flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
            aria-label="Close"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="relative p-4 sm:p-6 overflow-y-auto custom-scrollbar bg-[var(--panel-bg)] flex-1 font-['VT323'] text-lg text-[var(--text-primary)]">
          {children}
        </div>

        {/* Footer */}
        <div className="p-3 border-t-2 sm:border-t-4 border-[var(--border-color)] bg-[var(--bg-color)] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="pixel-btn w-full sm:w-auto text-xs sm:text-sm"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>,
    typeof window !== 'undefined' ? document.body : (null as any)
  )
}