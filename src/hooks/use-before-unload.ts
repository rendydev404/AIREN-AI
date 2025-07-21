import { useEffect } from 'react'

export function useBeforeUnload(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = 'Apakah Anda yakin ingin meninggalkan halaman ini? Perubahan yang belum disimpan mungkin akan hilang.'
      return event.returnValue
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [enabled])
} 