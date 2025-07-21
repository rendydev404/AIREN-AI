"use client"

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface WelcomeMessageProps {
  onComplete: () => void
}

export function WelcomeMessage({ onComplete }: WelcomeMessageProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const messages = [
    "Selamat datang di AIREN-AI! 🤖",
    "Saya adalah asisten AI yang dibuat oleh Rendi Irawan",
    "Saya dapat membantu Anda dengan berbagai tugas",
    "Mari kita mulai percakapan yang menarik!",
  ]

  useEffect(() => {
    if (!isVisible) return

    try {
      const messageElement = document.getElementById(`welcome-message-${currentStep}`)
      if (messageElement) {
        gsap.fromTo(
          messageElement,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        )
      }

      const timer = setTimeout(() => {
        if (currentStep < messages.length - 1) {
          setCurrentStep(prev => prev + 1)
        } else {
          gsap.to('.welcome-container', {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
              setIsVisible(false)
              onComplete()
            }
          })
        }
      }, 2000)

      return () => clearTimeout(timer)
    } catch (error) {
      console.warn('GSAP error in welcome message:', error)
      // Fallback: simple timeout
      const timer = setTimeout(() => {
        if (currentStep < messages.length - 1) {
          setCurrentStep(prev => prev + 1)
        } else {
          setIsVisible(false)
          onComplete()
        }
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, isVisible, messages.length, onComplete])

  if (!isVisible) return null

  return (
    <div className="welcome-container fixed inset-0 flex items-center justify-center z-[9998] bg-[var(--bg-primary)] bg-opacity-95">
      <div className="text-center max-w-md mx-auto p-6">
        {messages.map((message, index) => (
          <div
            key={index}
            id={`welcome-message-${index}`}
            className={`text-2xl font-bold mb-4 ${
              index === currentStep ? 'block' : 'hidden'
            }`}
            style={{ color: 'var(--accent-primary)' }}
          >
            {message}
          </div>
        ))}
        <div className="flex justify-center space-x-2 mt-6">
          {messages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'bg-[var(--accent-primary)] scale-125'
                  : 'bg-[var(--text-secondary)] opacity-50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 