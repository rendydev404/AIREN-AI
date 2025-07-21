export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-primary)]">
      <div className="text-center">
        <div className="typing-indicator my-8">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="text-[var(--text-secondary)]">Memuat AIREN-AI...</p>
      </div>
    </div>
  )
} 