import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'orbitron': ['Orbitron', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
      },
      animation: {
        'bounce': 'bounce 1.4s infinite ease-in-out both',
        'glitch': 'glitch-anim 2.5s infinite alternate steps(4, end)',
      },
      keyframes: {
        bounce: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1.0)' },
        },
        'glitch-anim': {
          '0%': { transform: 'translate(0,0) skew(0deg, 0deg)', opacity: '0.65' },
          '20%': { transform: 'translate(3px, -2px) skew(-3deg, 1.5deg)' },
          '40%': { transform: 'translate(-2px, 3px) skew(1.5deg, -3deg)', opacity: '0.85' },
          '60%': { transform: 'translate(1px, -1px) skew(-1deg, 0.5deg)' },
          '80%': { transform: 'translate(-1px, 1px) skew(0.5deg, -1deg)', opacity: '0.7' },
          '100%': { transform: 'translate(0,0) skew(0deg, 0deg)', opacity: '0.65' },
        },
      },
    },
  },
  plugins: [],
}

export default config 