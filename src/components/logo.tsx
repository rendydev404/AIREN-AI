"use client"

import Image from 'next/image'

export function LogoImage({ className = "", id }: { className?: string; id?: string }) {
  return (
    <Image
      src="/logo1.png"
      alt="Logo"
      width={150}
      height={150}
      className={className}
      id={id}
      priority
    />
  )
} 