"use client"

import { useEffect, useRef } from 'react'
import { LogoProps } from '@/types'

export function Logo3D({ text, className = "", id }: LogoProps) {
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateLogoLayers = () => {
      if (logoRef.current) {
        const textElement = logoRef.current.querySelector('.main-char') as HTMLElement
        if (textElement) {
          const textContent = textElement.textContent || text
          logoRef.current.querySelectorAll('.shadow-layer, .highlight-layer, .glow-layer, .glitch-layer').forEach(el => {
            (el as HTMLElement).setAttribute('data-text', textContent)
          })
        }
      }
    }

    updateLogoLayers()
  }, [text])

  return (
    <div ref={logoRef} id={id} className={`logo-r-3d-base ${className}`}>
      <span className="main-char">{text}</span>
      <span className="shadow-layer" data-text={text}></span>
      <span className="highlight-layer" data-text={text}></span>
      <span className="glow-layer" data-text={text}></span>
      <span className="glitch-layer" data-text={text}></span>
    </div>
  )
} 