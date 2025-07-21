import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--accent-primary)' }}>
          404
        </h2>
        <h3 className="text-2xl font-semibold mb-4">Halaman Tidak Ditemukan</h3>
        <p className="mb-6 text-[var(--text-secondary)]">
          Maaf, halaman yang Anda cari tidak ada.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[var(--accent-primary)] text-[var(--bubble-user-text)] rounded-lg hover:bg-[var(--accent-primary-hover)] transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
} 