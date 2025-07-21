"use client"

import { ClearChatProps } from '@/types'

export function ClearChat({ onClear, disabled = false }: ClearChatProps) {
  const handleClear = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua riwayat percakapan? Tindakan ini tidak dapat dibatalkan.')) {
      onClear()
    }
  }

  return (
    <button
      onClick={handleClear}
      disabled={disabled}
      className="ai-action-button text-xs sm:text-sm py-1.5 px-2.5 sm:py-2 sm:px-3"
      title="Clear Chat History"
    >
      <i className="fas fa-trash"></i> Clear
    </button>
  )
} 