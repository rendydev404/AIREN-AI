"use client"

import { useState } from 'react'
import { Modal } from './modal'
import { SettingsProps } from '@/types'

export function Settings({ isOpen, onClose, theme, onThemeChange }: SettingsProps) {
  const [autoSave, setAutoSave] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pengaturan"
      className="w-11/12 max-w-md"
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--accent-primary)' }}>
            Tema
          </h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={(e) => onThemeChange(e.target.value)}
                className="text-[var(--accent-primary)]"
              />
              <span>Light Mode</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={(e) => onThemeChange(e.target.value)}
                className="text-[var(--accent-primary)]"
              />
              <span>Dark Mode</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="system"
                checked={theme === 'system'}
                onChange={(e) => onThemeChange(e.target.value)}
                className="text-[var(--accent-primary)]"
              />
              <span>Sistem</span>
            </label>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--accent-primary)' }}>
            Umum
          </h4>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Auto Save Chat</span>
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="text-[var(--accent-primary)]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Suara Notifikasi</span>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="text-[var(--accent-primary)]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Animasi</span>
              <input
                type="checkbox"
                checked={animationsEnabled}
                onChange={(e) => setAnimationsEnabled(e.target.checked)}
                className="text-[var(--accent-primary)]"
              />
            </label>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--accent-primary)' }}>
            Keyboard Shortcuts
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Kirim Pesan</span>
              <kbd className="px-2 py-1 bg-[var(--bg-input)] rounded text-xs">Ctrl + Enter</kbd>
            </div>
            <div className="flex justify-between">
              <span>Ganti Tema</span>
              <kbd className="px-2 py-1 bg-[var(--bg-input)] rounded text-xs">Ctrl + T</kbd>
            </div>
            <div className="flex justify-between">
              <span>Coding Canvas</span>
              <kbd className="px-2 py-1 bg-[var(--bg-input)] rounded text-xs">Ctrl + K</kbd>
            </div>
            <div className="flex justify-between">
              <span>Info Developer</span>
              <kbd className="px-2 py-1 bg-[var(--bg-input)] rounded text-xs">Ctrl + I</kbd>
            </div>
            <div className="flex justify-between">
              <span>Ringkas Chat</span>
              <kbd className="px-2 py-1 bg-[var(--bg-input)] rounded text-xs">Ctrl + S</kbd>
            </div>
            <div className="flex justify-between">
              <span>Clear Chat</span>
              <kbd className="px-2 py-1 bg-[var(--bg-input)] rounded text-xs">Ctrl + L</kbd>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
} 