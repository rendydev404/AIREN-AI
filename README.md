
# AIREN-AI
=======
# AIREN-AI Next.js

Aplikasi AI Assistant yang dibuat dengan Next.js 15, TypeScript, dan Tailwind CSS.

## Fitur

- 🤖 **AI Assistant**: Integrasi dengan Gemini API untuk percakapan cerdas
- 🎨 **Tema Dinamis**: Light mode dan Dark mode dengan animasi smooth
- 📱 **Responsive Design**: Optimized untuk semua ukuran layar
- 🖼️ **Image Upload**: Upload dan analisis gambar dengan AI
- 💻 **Coding Canvas**: Tempat ngoding dengan preview real-time
- 📝 **Code Detection**: Deteksi otomatis kode dalam respons AI
- 🔍 **Image Imagination**: Fitur imajinasi AI untuk gambar
- 📊 **Conversation Summary**: Ringkasan percakapan otomatis
- ✨ **3D Logo Animation**: Logo dengan efek 3D dan glitch
- 🎭 **GSAP Animations**: Animasi smooth dengan GSAP

## Teknologi

- **Framework**: Next.js 15 dengan App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP
- **Theme**: next-themes
- **AI**: Google Gemini API
- **Icons**: Font Awesome

## Instalasi

1. Clone repository:
```bash
git clone <repository-url>
cd airen-ai-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp env.local .env.local
```

Edit `.env.local` dan tambahkan API key Gemini:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
```

4. Jalankan development server:
```bash
npm run dev
```

5. Buka [http://localhost:3000](http://localhost:3000) di browser

## Struktur Proyek

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── chat-bubble.tsx      # Chat message component
│   ├── coding-canvas.tsx    # Code editor component
│   ├── logo.tsx             # 3D logo component
│   ├── modal.tsx            # Modal component
│   └── theme-provider.tsx   # Theme provider
├── lib/
│   ├── api.ts               # Gemini API service
│   └── utils.ts             # Utility functions
└── types/                   # TypeScript types
```

## Fitur Baru

### 1. Enhanced Code Detection
- Deteksi otomatis bahasa pemrograman
- Syntax highlighting
- Copy to clipboard functionality

### 2. Improved Image Handling
- Drag & drop support
- Image preview
- Fullscreen view
- AI image analysis

### 3. Better UX
- Smooth animations
- Loading states
- Error handling
- Responsive design

### 4. Developer Experience
- TypeScript support
- Component-based architecture
- Environment variables
- Hot reload

## API Endpoints

Aplikasi menggunakan Google Gemini API untuk:
- Text generation
- Image analysis
- Code generation
- Conversation summarization

## Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository ke Vercel
3. Add environment variables
4. Deploy

### Manual Build
```bash
npm run build
npm start
```

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License - lihat file LICENSE untuk detail

## 👨‍💻 Developer

**Rendi Irawan**

---

[![Email](https://img.shields.io/badge/Email-irawanrendy55@gmail.com-red?style=for-the-badge&logo=gmail&logoColor=white)](mailto:irawanrendy55@gmail.com)
[![Instagram](https://img.shields.io/badge/@rendyy__404-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/rendyy_404)
[![GitHub](https://img.shields.io/badge/GitHub-rendydev404-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rendydev404)


---

BY RENDY IRAWAN
>>>>>>> a18d3e8 (Initial commit)
