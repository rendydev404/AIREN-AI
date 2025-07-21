'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-primary)' }}>
          Oops! Ada yang salah
        </h2>
        <p className="mb-6 text-[var(--text-secondary)]">
          Terjadi kesalahan yang tidak terduga. Silakan coba lagi.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-[var(--accent-primary)] text-[var(--bubble-user-text)] rounded-lg hover:bg-[var(--accent-primary-hover)] transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  )
} 