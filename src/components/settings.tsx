"use client"

import { useState } from 'react'
import { Modal } from './modal'
import { SettingsProps } from '@/types'

// Pixel Checkbox Component (replaces Toggle)
function PixelCheckbox({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return (
    <label
      className="flex items-center justify-between cursor-pointer group py-3 px-3 hover:bg-[var(--accent-bg)] transition-colors border-2 border-transparent hover:border-[var(--border-color)]"
    >
      <span className="font-bold uppercase text-xs sm:text-sm font-['Press_Start_2P']">{label}</span>
      <div
        onClick={(e) => {
          e.preventDefault()
          onChange(!checked)
        }}
        className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center cursor-pointer bg-[var(--panel-bg)] border-2 sm:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--border-color)]"
      >
        {checked && <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[var(--accent-primary)] animate-in zoom-in duration-200"></div>}
      </div>
    </label>
  )
}

// Pixel Radio Component
function PixelRadio({ checked, onChange, label, description }: { checked: boolean; onChange: () => void; label: string; description?: string }) {
  return (
    <label
      onClick={onChange}
      className={`flex items-start gap-4 p-3 cursor-pointer border-2 transition-all duration-200 ${checked ? 'border-[var(--accent-primary)] bg-[var(--accent-bg)] shadow-[4px_4px_0px_rgba(0,0,0,0.1)]' : 'border-transparent hover:border-[var(--border-color)]'}`}
    >
      <div
        className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center border-2 sm:border-4 border-[var(--border-color)] bg-[var(--panel-bg)] rounded-none"
      >
        {checked && <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[var(--accent-primary)] rounded-none animate-in zoom-in duration-200"></div>}
      </div>
      <div>
        <span className="font-bold uppercase block text-xs sm:text-sm mb-1 font-['Press_Start_2P']">{label}</span>
        {description && <p className="text-sm sm:text-base opacity-90 font-['VT323'] leading-tight">{description}</p>}
      </div>
    </label>
  )
}

// Separator
function PixelDivider() {
  return (
    <div
      className="my-4 sm:my-6 h-1 w-full bg-[var(--border-color)] opacity-20"
    />
  )
}

export function Settings({ isOpen, onClose, theme, onThemeChange }: SettingsProps) {
  // Mock states for UI demo (persistence not fully implemented yet)
  const [autoSave, setAutoSave] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="SETTINGS"
    >
      <div className="space-y-4 sm:space-y-6">
        {/* Theme Section */}
        <div>
          <h4 className="mb-3 sm:mb-4 text-xs font-['Press_Start_2P'] text-[var(--text-secondary)] tracking-widest">
            [ THEME SELECT ]
          </h4>
          <div className="flex flex-col gap-2">
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
              description="Auto-Detect System Prefs"
            />
          </div>
        </div>

        <PixelDivider />

        {/* General Settings */}
        <div>
          <h4 className="mb-3 sm:mb-4 text-xs font-['Press_Start_2P'] text-[var(--text-secondary)] tracking-widest">
            [ SYSTEM CONFIG ]
          </h4>
          <div className="flex flex-col gap-1 border-2 border-[var(--border-color)] p-2 bg-[var(--bg-color)] shadow-[4px_4px_0px_rgba(0,0,0,0.05)]">
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
          <h4 className="mb-3 sm:mb-4 text-xs font-['Press_Start_2P'] text-[var(--text-secondary)] tracking-widest">
            [ CONTROLS ]
          </h4>
          <div className="border-2 border-[var(--border-color)] p-3 sm:p-4 space-y-3 font-mono text-sm bg-[var(--panel-bg)]">
            <div className="flex justify-between items-center group">
              <span className="text-[var(--text-primary)]">SEND MSG</span>
              <kbd className="bg-[var(--text-secondary)] text-[var(--bg-color)] px-2 py-0.5 text-xs font-bold font-['Press_Start_2P'] group-hover:bg-[var(--accent-primary)] transition-colors">CTRL+ENTER</kbd>
            </div>
            <div className="flex justify-between items-center group">
              <span className="text-[var(--text-primary)]">THEME</span>
              <kbd className="bg-[var(--text-secondary)] text-[var(--bg-color)] px-2 py-0.5 text-xs font-bold font-['Press_Start_2P'] group-hover:bg-[var(--accent-primary)] transition-colors">CTRL+T</kbd>
            </div>
            <div className="flex justify-between items-center group">
              <span className="text-[var(--text-primary)]">CLEAR</span>
              <kbd className="bg-[var(--text-secondary)] text-[var(--bg-color)] px-2 py-0.5 text-xs font-bold font-['Press_Start_2P'] group-hover:bg-[var(--accent-primary)] transition-colors">CTRL+L</kbd>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}