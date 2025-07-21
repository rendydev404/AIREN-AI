import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AIREN-AI - Asisten Cerdas By Rendi Irawan',
    short_name: 'AIREN-AI',
    description: 'AI Assistant yang dibuat oleh Rendi Irawan',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0f9ff',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: 'https://placehold.co/192x192/0ea5e9/white?text=R&font=orbitron',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://placehold.co/512x512/0ea5e9/white?text=R&font=orbitron',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
} 