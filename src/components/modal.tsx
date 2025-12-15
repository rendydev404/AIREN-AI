"use client"

import { useEffect, useRef, useState } from 'react'
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
      className={`modal fixed inset-0 z-[9999] flex items-center justify-center p-4 ${className}`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        background: 'rgba(0,0,0,0.85)', // Dark dimming for retro focus
        display: 'flex',
      }}
    >
      <div
        className="modal-content pixel-box w-full max-w-md mx-auto relative"
        style={{
          background: 'var(--panel-bg)',
          border: '4px solid var(--border-color)',
          boxShadow: '8px 8px 0px rgba(0,0,0,0.5)',
          padding: '20px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 0,
        }}
      >
        {/* Retro Title Bar */}
        <div
          className="flex justify-between items-center mb-6 pb-2"
          style={{
            borderBottom: '4px solid var(--border-color)',
          }}
        >
          <h3
            className="text-lg font-bold uppercase truncate pr-4"
            style={{
              fontFamily: '"Press Start 2P", cursive',
              color: 'var(--accent-primary)',
              lineHeight: '1.5',
            }}
          >
            {title}
          </h3>

          <button
            onClick={onClose}
            className="pixel-btn"
            style={{
              padding: '4px 8px',
              minWidth: '32px',
              minHeight: '32px',
              background: 'var(--bg-color)',
            }}
          >
            X
          </button>
        </div>

        {/* Content */}
        <div
          className="relative z-10 overflow-y-auto custom-scrollbar"
          style={{
            color: 'var(--text-primary)',
            fontFamily: '"VT323", monospace',
            fontSize: '1.2rem',
          }}
        >
          {children}
        </div>

        {/* Bottom Button Area if needed, but usually just content for modals. 
            We'll add a pixel separator though. */}
        <div className="mt-6 pt-4 border-t-4 border-[var(--border-color)]">
          <button
            onClick={onClose}
            className="pixel-btn w-full"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>,
    typeof window !== 'undefined' ? document.body : (null as any)
  )
}