"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ModalProps } from '@/types'
import { createPortal } from 'react-dom'

export function Modal({ isOpen, onClose, title, children, className = "" }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (isOpen) {
      try {
        gsap.set(modalRef.current, { opacity: 0, scale: 0.95, display: 'flex' })
        gsap.to(modalRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out', display: 'flex' })
        gsap.fromTo(contentRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' })
      } catch {}
    } else {
      try {
        gsap.to(modalRef.current, { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in', onComplete: () => {
          if (modalRef.current) modalRef.current.style.display = 'none'
        } })
      } catch {}
    }
  }, [isOpen, mounted])

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

  if (!mounted) return null
  if (!isOpen) return null

  // Fallback: force visible jika animasi gagal
  if (modalRef.current) {
    modalRef.current.style.display = 'flex'
    modalRef.current.style.opacity = '1'
    modalRef.current.style.visibility = 'visible'
    modalRef.current.style.zIndex = '99999'
  }

  return createPortal(
    <div
      ref={modalRef}
      className={`modal fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 ${className}`}
      style={{
        padding: '1rem',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
        zIndex: 99999,
        display: 'flex',
        opacity: 1,
        visibility: 'visible',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        ref={contentRef}
        className="modal-content rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 w-11/12 max-w-lg mx-auto"
        style={{
          position: 'relative',
          left: 'auto',
          right: 'auto',
          top: 'auto',
          bottom: 'auto',
          margin: '0 auto',
          transform: 'none',
          maxWidth: '95vw',
          maxHeight: '95vh',
          overflowY: 'auto',
        }}
      >
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4" style={{ color: 'var(--accent-primary)' }}>
          {title}
        </h3>
        <div className="max-h-[60vh] overflow-y-auto text-sm md:text-base leading-relaxed">
          {children}
        </div>
        <button
          onClick={onClose}
          className="modal-close-button mt-6 w-full rounded-lg"
        >
          Tutup
        </button>
      </div>
    </div>,
    typeof window !== 'undefined' ? document.body : (null as any)
  )
} 