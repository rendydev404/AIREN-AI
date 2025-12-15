"use client"

import { useState } from 'react'
import { Modal } from './modal'
import { SettingsProps } from '@/types'

// Pixel Checkbox Component (replaces Toggle)
function PixelCheckbox({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return (
    <label
      className="flex items-center justify-between cursor-pointer group py-3 px-2 hover:bg-[var(--accent-bg)] transition-colors"
      style={{ border: '2px solid transparent' }}
    >
      <span className="font-bold uppercase text-sm" style={{ fontFamily: '"Press Start 2P"' }}>{label}</span>
      <div
        onClick={() => onChange(!checked)}
        className="w-8 h-8 flex items-center justify-center cursor-pointer"
        style={{
          background: 'var(--panel-bg)',
          border: '4px solid var(--border-color)',
          boxShadow: '2px 2px 0px var(--border-color)',
        }}
      >
        {checked && <div className="w-4 h-4 bg-[var(--accent-primary)]"></div>}
      </div>
    </label>
  )
}

// Pixel Radio Component
function PixelRadio({ checked, onChange, label, description }: { checked: boolean; onChange: () => void; label: string; description?: string }) {
  return (
    <label
      onClick={onChange}
      className={`flex items-start gap-4 p-3 cursor-pointer border-2 ${checked ? 'border-[var(--accent-primary)] bg-[var(--accent-bg)]' : 'border-transparent'}`}
    >
      <div
        className="w-6 h-6 flex-shrink-0 flex items-center justify-center"
        style={{
          border: '4px solid var(--border-color)',
          background: 'var(--panel-bg)',
          borderRadius: 0, // Explicitly square
        }}
      >
        {checked && <div className="w-3 h-3 bg-[var(--accent-primary)] rounded-none"></div>}
      </div>
      <div>
        <span className="font-bold uppercase block text-sm mb-1" style={{ fontFamily: '"Press Start 2P"' }}>{label}</span>
        {description && <p className="text-sm opacity-80" style={{ fontFamily: '"VT323"' }}>{description}</p>}
      </div>
    </label>
  )
}

// Separator
function PixelDivider() {
  return (
    <div
      className="my-6"
      style={{
        height: '4px',
        background: 'var(--border-color)',
        opacity: 0.2
      }}
    />
  )
}

export function Settings({ isOpen, onClose, theme, onThemeChange }: SettingsProps) {
  const [autoSave, setAutoSave] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="SETTINGS"
    >
      <div className="space-y-6">
        {/* Theme Section */}
        <div>
          <h4
            className="mb-4 text-xs"
            style={{ fontFamily: '"Press Start 2P"', color: 'var(--text-secondary)' }}
          >
            [ THEME SELECT ]
          </h4>
          <div className="space-y-2">
            <PixelRadio
              checked={theme === 'light'}
              onChange={() => onThemeChange('light')}
              label="LIGHT"
              description="Retro Beige Mode"
            />
            <PixelRadio
              checked={theme === 'dark'}
              onChange={() => onThemeChange('dark')}
              label="DARK"
              description="Retro Terminal Mode"
            />
            <PixelRadio
              checked={theme === 'system'}
              onChange={() => onThemeChange('system')}
              label="SYSTEM"
              description="Auto-Detect"
            />
          </div>
        </div>

        <PixelDivider />

        {/* General Settings */}
        <div>
          <h4
            className="mb-4 text-xs"
            style={{ fontFamily: '"Press Start 2P"', color: 'var(--text-secondary)' }}
          >
            [ SYSTEM CONFIG ]
          </h4>
          <div className="space-y-1 border-2 border-[var(--border-color)] p-2">
            <PixelCheckbox
              checked={autoSave}
              onChange={setAutoSave}
              label="AUTO-SAVE"
            />
            <PixelCheckbox
              checked={soundEnabled}
              onChange={setSoundEnabled}
              label="SOUND FX"
            />
            <PixelCheckbox
              checked={animationsEnabled}
              onChange={setAnimationsEnabled}
              label="ANIMATION"
            />
          </div>
        </div>

        <PixelDivider />

        {/* Keyboard Shortcuts */}
        <div>
          <h4
            className="mb-4 text-xs"
            style={{ fontFamily: '"Press Start 2P"', color: 'var(--text-secondary)' }}
          >
            [ CONTROLS ]
          </h4>
          <div className="border-2 border-[var(--border-color)] p-4 space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span>SEND MSG</span>
              <span className="bg-[var(--text-secondary)] text-[var(--bg-color)] px-2">CTRL+ENTER</span>
            </div>
            <div className="flex justify-between">
              <span>THEME</span>
              <span className="bg-[var(--text-secondary)] text-[var(--bg-color)] px-2">CTRL+T</span>
            </div>
            <div className="flex justify-between">
              <span>CLEAR</span>
              <span className="bg-[var(--text-secondary)] text-[var(--bg-color)] px-2">CTRL+L</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}