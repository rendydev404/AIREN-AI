"use client"

import { useState, useEffect } from 'react'

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-red-500 text-white rounded-lg p-3 shadow-lg z-50">
      <div className="flex items-center space-x-2">
        <i className="fas fa-wifi-slash"></i>
        <span className="text-sm font-medium">
          Anda sedang offline. Beberapa fitur mungkin tidak tersedia.
        </span>
      </div>
    </div>
  )
} 