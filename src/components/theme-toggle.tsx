"use client"

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface ThemeToggleProps {
  onThemeChange?: (theme: string) => void
}

export function ThemeToggle({ onThemeChange }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="header-button p-2.5 rounded-full focus:outline-none">
        <i className="fas fa-circle-notch fa-spin"></i>
      </button>
    )
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    if (onThemeChange) {
      onThemeChange(newTheme)
    } else {
      setTheme(newTheme)
    }
  }

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className="header-button p-2.5 rounded-full focus:outline-none transition-all duration-300 hover:scale-110"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <i 
        className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} transition-transform duration-300`}
        style={{ 
          color: theme === 'dark' ? '#facc15' : 'var(--sky-500)',
          transform: theme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)'
        }}
      ></i>
    </button>
  )
} 