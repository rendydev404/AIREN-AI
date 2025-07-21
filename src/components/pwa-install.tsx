"use client"

import { useState, useEffect } from 'react'

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    setDeferredPrompt(null)
  }

  if (!showInstallPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-[var(--bg-secondary)] border-2 border-[var(--accent-primary)] rounded-lg p-4 shadow-lg z-50">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <i className="fas fa-download text-[var(--accent-primary)] text-xl"></i>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-[var(--text-primary)] mb-1">
            Install AIREN-AI
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            Install aplikasi ini di perangkat Anda untuk akses yang lebih cepat
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleInstall}
              className="px-3 py-1.5 bg-[var(--accent-primary)] text-[var(--bubble-user-text)] rounded text-sm font-medium hover:bg-[var(--accent-primary-hover)] transition-colors"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 border border-[var(--border-color)] text-[var(--text-secondary)] rounded text-sm hover:bg-[var(--bg-input)] transition-colors"
            >
              Nanti
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  )
} 