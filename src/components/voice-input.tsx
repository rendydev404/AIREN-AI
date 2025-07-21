"use client"

import { useState, useRef } from 'react'
import { VoiceInputProps } from '@/types'

export function VoiceInput({ onTranscript, disabled = false }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  useState(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      setIsSupported(true)
      recognitionRef.current = new (window as any).webkitSpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'id-ID'
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        onTranscript(transcript)
        setIsListening(false)
      }
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }
      
      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  })

  const startListening = () => {
    if (recognitionRef.current && !disabled) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (error) {
        console.error('Error starting voice recognition:', error)
        alert('Gagal memulai voice recognition. Pastikan browser mendukung fitur ini.')
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <button
      onClick={isListening ? stopListening : startListening}
      disabled={disabled}
      className={`p-3 rounded-lg transition-all duration-200 focus:outline-none ${
        isListening 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] hover:bg-[rgba(var(--accent-primary-rgb),0.15)] hover:scale-110'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={isListening ? 'Stop Recording' : 'Start Voice Input'}
    >
      <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'}`}></i>
    </button>
  )
} 