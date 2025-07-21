"use client"

import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { Logo3D } from '@/components/logo'
import { ChatBubble } from '@/components/chat-bubble'
import { Modal } from '@/components/modal'
import { CodingCanvas } from '@/components/coding-canvas'
import { VoiceInput } from '@/components/voice-input'
import { ExportChat } from '@/components/export-chat'
import { ClearChat } from '@/components/clear-chat'
import { Settings } from '@/components/settings'
import { PWAInstall } from '@/components/pwa-install'
import { OfflineIndicator } from '@/components/offline-indicator'
import { ThemeToggle } from '@/components/theme-toggle'
import { WelcomeMessage } from '@/components/welcome-message'
import { GeminiAPI } from '@/lib/api'
import { ChatMessage } from '@/types'
import { detectCodeAndLanguage } from '@/lib/utils'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'
import { useChatStorage } from '@/hooks/use-chat-storage'
import { useBeforeUnload } from '@/hooks/use-before-unload'
import { analytics } from '@/lib/analytics'

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [splashShown, setSplashShown] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [messages, setMessages] = useState<Array<{
    id: string
    message: string
    sender: 'user' | 'ai'
    imageUrl?: string
    isLoading?: boolean
    isActionBubble?: boolean
    actionButtonId?: string
    actionButtonText?: string
    actionData?: any
    isCodeBubble?: boolean
    codeContent?: string
    codeLang?: string
  }>>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [showImagePreview, setShowImagePreview] = useState(false)
  const [lastSentImageBase64, setLastSentImageBase64] = useState<string | null>(null)
  const [lastSentImageMimeType, setLastSentImageMimeType] = useState<string | null>(null)
  
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [infoModalTitle, setInfoModalTitle] = useState('')
  const [infoModalMessage, setInfoModalMessage] = useState('')
  const [isImageFullscreenOpen, setIsImageFullscreenOpen] = useState(false)
  const [fullscreenImageSrc, setFullscreenImageSrc] = useState('')
  const [isCodingCanvasOpen, setIsCodingCanvasOpen] = useState(false)
  const [isDeveloperInfoOpen, setIsDeveloperInfoOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  
  const chatInputRef = useRef<HTMLInputElement>(null)
  const appMainRef = useRef<HTMLDivElement>(null)
  const splashScreenRef = useRef<HTMLDivElement>(null)
  const appHeaderRef = useRef<HTMLElement>(null)
  const appFooterRef = useRef<HTMLElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const themeTransitionRef = useRef<HTMLDivElement>(null)

  const creatorKeywords = [
    'siapa pembuatmu', 'siapa yang menciptakanmu', 'siapa yang membuatmu', 'siapa yg membuat lu', 'lu buatan siapa?', 'siapa developermu', 'dibuat oleh siapa kamu',
    'pencipta kamu siapa', 'yang bikin kamu siapa', 'kamu buatan siapa', 'asalmu dari mana', 'asal usulmu',
    'tell me about your creator', 'who is your creator', 'who developed you', 'who made you',
    'who is your developer', 'your origin', 'where are you from', 'who is your boss',
    'pemilik kamu siapa', 'rendi irawan itu siapa', 'apakah kamu dari google', 'apa kamu produk google',
    'are you a google product', 'is google your maker', 'kamu google punya bukan', 'apakah rendi irawan itu google',
    'kamu ai google ya', 'kamu ai punya google', 'kamu dibuat google', 'are you made by google',
    'your manufacturer', 'siapa yang merancangmu', 'siapa arsitekmu', 'siapa yang ngoding kamu',
    'siapa programmer kamu', 'siapa yang program kamu', 'who programmed you', 'your programmer',
    'apakah kamu ciptaan google', 'kamu bukan buatan google kan', 'kamu google punya?'
  ]

  useEffect(() => {
    // Use a separate effect to handle client-side only operations
    const handleInitialization = () => {
      const splashShownStorage = sessionStorage.getItem('splashShownRAIv4')
      if (splashShownStorage) {
        setSplashShown(true)
        setTimeout(() => initApp(), 100)
      } else {
        showSplashScreen()
      }
    }

    // Delay to ensure hydration is complete
    const timer = setTimeout(handleInitialization, 100)
    return () => clearTimeout(timer)
  }, [])

  const showSplashScreen = () => {
    if (splashScreenRef.current) {
      try {
        const tlSplash = gsap.timeline({
          onComplete: () => {
            sessionStorage.setItem('splashShownRAIv4', 'true')
            setSplashShown(true)
            initApp()
          }
        })
        
        tlSplash.fromTo(splashScreenRef.current, 
          { scale: 0.2, opacity: 0, rotationY: -270, rotationX: 60 }, 
          { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 2.2, ease: "elastic.out(1, 0.3)" }
        )
        .to(splashScreenRef.current, { 
          scale: 1.15, rotationX:15, rotationY:-20, 
          duration: 0.5, yoyo:true, repeat:3, ease:"power2.inOut" 
        }, "-=1.2")
        .to(splashScreenRef.current, {
          textShadow: `0 0 30px var(--logo-glow-color), 0 0 50px var(--logo-glow-color)`, 
          duration: 0.6
        }, "-=0.8")
        .to(splashScreenRef.current, { 
          opacity: 0, duration: 1.2, ease: "power3.inOut", delay: 0.8
        })
      } catch (error) {
        console.warn('GSAP error in splash screen:', error)
        // Fallback: skip splash screen
        sessionStorage.setItem('splashShownRAIv4', 'true')
        setSplashShown(true)
        initApp()
      }
    } else {
      // Fallback: skip splash screen
      sessionStorage.setItem('splashShownRAIv4', 'true')
      setSplashShown(true)
      initApp()
    }
  }

  const initApp = () => {
    setIsInitialized(true)
    
    // Check if refs are available before using GSAP
    const elements = [appHeaderRef.current, appMainRef.current, appFooterRef.current].filter(Boolean)
    
    if (elements.length > 0) {
      gsap.to(elements, {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.3, ease: "power3.out", delay: 0.3
      })
    }

    try {
      analytics.trackPageView('home')
    } catch (error) {
      console.warn('Analytics error:', error)
    }
    
    // Show welcome message for first-time users
    setTimeout(() => {
      const hasSeenWelcome = localStorage.getItem('airen-ai-welcome-seen')
      if (!hasSeenWelcome) {
        setShowWelcome(true)
      } else {
        addMessage("Salam kenal! Saya AIREN-AI, sebuah inovasi AI yang sepenuhnya dikonsep dan dibangun oleh <strong>AIREN-TEAM</strong>. Saya siap membantu Anda dengan kemampuan baru saya! Ada yang bisa saya proses hari ini?", 'ai')
      }
    }, 200)
  }

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
    localStorage.setItem('airen-ai-welcome-seen', 'true')
    addMessage("Salam kenal! Saya AIREN-AI, sebuah inovasi AI yang sepenuhnya dikonsep dan dibangun oleh <strong>AIREN-TEAM</strong>. Saya siap membantu Anda dengan kemampuan baru saya! Ada yang bisa saya proses hari ini?", 'ai')
  }

  const addMessage = (
    message: string, 
    sender: 'user' | 'ai', 
    imageUrl?: string,
    isLoading = false,
    isActionBubble = false,
    actionButtonId?: string,
    actionButtonText?: string,
    actionData?: any,
    isCodeBubble = false,
    codeContent?: string,
    codeLang?: string
  ) => {
    const newMessage = {
      id: Date.now().toString(),
      message,
      sender,
      imageUrl,
      isLoading,
      isActionBubble,
      actionButtonId,
      actionButtonText,
      actionData,
      isCodeBubble,
      codeContent,
      codeLang
    }
    
    setMessages(prev => [...prev, newMessage])
    
    setTimeout(() => {
      if (appMainRef.current) {
        appMainRef.current.scrollTop = appMainRef.current.scrollHeight
      }
    }, 100)
  }

  const updateLastMessage = (updates: Partial<{
    message: string
    isLoading: boolean
    isCodeBubble: boolean
    codeContent: string
    codeLang: string
  }>) => {
    setMessages(prev => {
      if (prev.length === 0) return prev
      const newMessages = [...prev]
      const lastMessage = newMessages[newMessages.length - 1]
      Object.assign(lastMessage, updates)
      return newMessages
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setShowImagePreview(true)
        
        // Safe GSAP animation
        try {
          gsap.fromTo('.image-preview-container', 
            {opacity:0, maxHeight:0, y:-10}, 
            {opacity:1, maxHeight:'150px', y:0, duration:0.4, ease:'power2.out'}
          )
        } catch (error) {
          console.warn('GSAP error in image upload:', error)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImageFile(null)
    setLastSentImageBase64(null)
    setLastSentImageMimeType(null)
    setImagePreview('')
    setShowImagePreview(false)
    
    // Safe GSAP animation
    try {
      gsap.to('.image-preview-container', {
        opacity:0, maxHeight:0, y:-10, duration:0.3, ease:'power2.in'
      })
    } catch (error) {
      console.warn('GSAP error in remove image:', error)
    }
  }

  const handleVoiceInput = (transcript: string) => {
    if (chatInputRef.current) {
      chatInputRef.current.value = transcript
    }
    analytics.trackMessageSent('voice')
  }

  const handleSendMessage = async () => {
    const messageText = chatInputRef.current?.value.trim() || ''
    if (!messageText && !selectedImageFile) return

    const messageType = selectedImageFile ? 'image' : 'text'
    analytics.trackMessageSent(messageType)

    let userMessageImageUrl: string | undefined = undefined
    if (selectedImageFile) {
      userMessageImageUrl = imagePreview
      setLastSentImageBase64(null)
      setLastSentImageMimeType(null)
    }

    addMessage(messageText, 'user', userMessageImageUrl)

    if (chatInputRef.current) {
      chatInputRef.current.disabled = true
      chatInputRef.current.value = ''
    }

    if (selectedImageFile) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1]
        const mimeType = selectedImageFile.type
        setLastSentImageBase64(base64Data)
        setLastSentImageMimeType(mimeType)
        await processAndSendToAI(messageText, base64Data, mimeType)
        removeImage()
      }
      reader.readAsDataURL(selectedImageFile)
    } else {
      setLastSentImageBase64(null)
      setLastSentImageMimeType(null)
      await processAndSendToAI(messageText, undefined, undefined)
    }
  }

  const processAndSendToAI = async (text: string, imageBase64: string | undefined, imageMimeType: string | undefined) => {
    const lowerCaseMessage = text.toLowerCase()
    
    if (creatorKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
      const responsesRendi = [
        "Saya adalah AIREN-AI, sebuah model AI yang sepenuhnya dirancang, dikembangkan, dan dilatih oleh <strong>Rendi Irawan</strong>. Beliau adalah seorang individu jenius yang mempelajari semuanya secara otodidak. Saya adalah bukti nyata dari dedikasi dan bakatnya!",
        "Dengan penuh kebanggaan, saya menyatakan bahwa pencipta saya adalah <strong>Rendi Irawan</strong>. Saya adalah proyek AI orisinal dan inovatif yang lahir dari kerja kerasnya, bukan produk dari Google atau korporasi besar lainnya.",
      ]
      const randomResponse = responsesRendi[Math.floor(Math.random() * responsesRendi.length)]
      
      setTimeout(() => {
        addMessage(randomResponse, 'ai')
        finalizeSend()
      }, 1300 + Math.random() * 600)
      return
    }

    addMessage('', 'ai', undefined, true)

    try {
      let currentConversationParts: any[] = []
      if (text) {
        currentConversationParts.push({ text: text })
      }
      if (imageBase64 && imageMimeType) {
        currentConversationParts.push({
          inlineData: {
            mimeType: imageMimeType,
            data: imageBase64
          }
        })
      }

      if (currentConversationParts.length === 0) {
        finalizeSend()
        return
      }

      let payloadContents = [...chatHistory]
      if (currentConversationParts.length > 0) {
        payloadContents.push({ role: "user", parts: currentConversationParts })
      }

      const aiResponseText = await GeminiAPI.generateContent(payloadContents)
      
      // Update the loading message with actual content
      const codeCheck = detectCodeAndLanguage(aiResponseText)
      if (codeCheck.isCode) {
        updateLastMessage({
          message: '',
          isLoading: false,
          isCodeBubble: true,
          codeContent: codeCheck.content,
          codeLang: codeCheck.language
        })
      } else {
        updateLastMessage({
          message: aiResponseText,
          isLoading: false
        })
      }

      if (currentConversationParts.length > 0) {
        setChatHistory(prev => [...prev, { role: "user", parts: currentConversationParts }])
      }
      setChatHistory(prev => [...prev, { role: "model", parts: [{ text: aiResponseText }] }])

      if (imageBase64 && lastSentImageBase64) {
        setTimeout(() => {
          addMessage(
            'Tertarik untuk melihat imajinasi AIREN-AI tentang gambar ini?', 
            'ai', undefined, false, true, 
            `imagine-btn-${Date.now()}`, 
            '<i class="fas fa-lightbulb"></i> Biarkan AIREN-AI Berimajinasi!',
            { type: 'imagineImage', imageBase64: lastSentImageBase64, imageMimeType: lastSentImageMimeType }
          )
        }, 700)
      }

    } catch (error) {
      console.error('Gagal memanggil Gemini API:', error)
      updateLastMessage({
        message: "Aduh, sepertinya ada masalah dengan koneksi internetku. Pastikan kamu online dan coba lagi ya.",
        isLoading: false
      })
      showInfoModal("Error Koneksi", "Tidak dapat terhubung ke layanan AI. Periksa koneksi internet Anda.")
    } finally {
      finalizeSend()
    }
  }

  const handleImagineImage = async (actionData: any) => {
    if (!actionData.imageBase64 || !actionData.imageMimeType) {
      showInfoModal("Info", "Tidak ada gambar yang terdeteksi untuk diimajinasikan.")
      return
    }

    addMessage('', 'ai', undefined, true)

    try {
      const imaginativeText = await GeminiAPI.imagineImage(actionData.imageBase64, actionData.imageMimeType)
      updateLastMessage({
        message: `<strong>Imajinasi AIREN-AI:</strong><br>${imaginativeText}`,
        isLoading: false
      })
      
      setChatHistory(prev => [
        ...prev, 
        { role: "user", parts: [{text: "[Permintaan Imajinasi Gambar]"}] },
        { role: "model", parts: [{ text: `Imajinasi AIREN-AI: ${imaginativeText}` }] }
      ])
    } catch (error) {
      console.error('Gagal memanggil Vision API:', error)
      updateLastMessage({
        message: "Ada sedikit gangguan saat AIREN-AI mencoba berimajinasi.",
        isLoading: false
      })
    }
  }

  const handleSummarize = async () => {
    if (chatHistory.length === 0) {
      showInfoModal("Info", "Belum ada percakapan untuk diringkas.")
      return
    }

    analytics.trackFeatureUsed('summarize')

    let conversationText = "Berikut adalah transkrip percakapan antara Pengguna dan AIREN-AI (sebuah AI yang dibuat oleh Rendi Irawan):\n\n"
    chatHistory.forEach(entry => {
      const speaker = entry.role === 'user' ? 'Pengguna' : 'AIREN-AI'
      let textPart = ""
      entry.parts.forEach(part => {
        if(part.text) textPart += part.text + " "
        if(part.inlineData) textPart += "[GAMBAR DIKIRIM OLEH PENGGUNA] "
      })
      conversationText += `${speaker}: ${textPart.trim()}\n`
    })

    try {
      const summary = await GeminiAPI.summarizeConversation(conversationText)
      showInfoModal("Ringkasan Percakapan oleh AIREN-AI", summary)
    } catch (error) {
      console.error("Error meringkas:", error)
      showInfoModal("Error", `Gagal membuat ringkasan percakapan. ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const showInfoModal = (title: string, message: string) => {
    setInfoModalTitle(title)
    setInfoModalMessage(message)
    setIsInfoModalOpen(true)
  }

  const { clearChatHistory } = useChatStorage(chatHistory, setChatHistory)
  
  useKeyboardShortcuts({
    onSendMessage: handleSendMessage,
    onToggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    onOpenCodingCanvas: () => setIsCodingCanvasOpen(true),
    onOpenDeveloperInfo: () => setIsDeveloperInfoOpen(true),
    onSummarize: handleSummarize,
    onClearChat: clearChatHistory,
    disabled: !splashShown
  })
  
  // Enable before unload warning when there are unsaved messages
  useBeforeUnload(messages.length > 0)

  const finalizeSend = () => {
    if (chatInputRef.current) {
      chatInputRef.current.disabled = false
      chatInputRef.current.focus()
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  const openFullscreenImage = (src: string) => {
    setFullscreenImageSrc(src)
    setIsImageFullscreenOpen(true)
  }

  // Animasi sidebar buka/tutup
  useEffect(() => {
    if (!sidebarRef.current) return
    if (isSidebarOpen) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -60, scale: 0.96, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.55, ease: 'power4.out' }
      )
      // animasi overlay
      const overlay = document.getElementById('sidebar-overlay')
      if (overlay) {
        gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      }
    } else {
      gsap.to(sidebarRef.current, { x: -60, scale: 0.96, opacity: 0, duration: 0.4, ease: 'power2.in' })
      const overlay = document.getElementById('sidebar-overlay')
      if (overlay) {
        gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in' })
      }
    }
  }, [isSidebarOpen])

  // Animasi transisi tema
  const handleThemeChange = (newTheme: string) => {
    if (!themeTransitionRef.current) {
      setTheme(newTheme)
      return
    }
    const themeBtn = document.getElementById('theme-toggle-btn')
    if (!themeBtn) {
      setTheme(newTheme)
      return
    }
    const rect = themeBtn.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    themeTransitionRef.current.style.display = 'block'
    themeTransitionRef.current.style.left = `${cx}px`
    themeTransitionRef.current.style.top = `${cy}px`
    gsap.fromTo(themeTransitionRef.current, {
      scale: 0,
      opacity: 0.7,
      background: newTheme === 'dark' ? '#0a0a1f' : '#f1f5f9',
    }, {
      scale: Math.max(vw, vh) / 20,
      opacity: 1,
      duration: 0.55,
      ease: 'power2.inOut',
      onComplete: () => {
        setTheme(newTheme)
        setTimeout(() => {
          gsap.to(themeTransitionRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
            if (themeTransitionRef.current) themeTransitionRef.current.style.display = 'none'
          } })
        }, 200)
      }
    })
  }

  if (!splashShown) {
    return (
      <div id="splash-screen" className="fixed inset-0 flex items-center justify-center z-[9999] bg-[var(--bg-primary)]">
        <div ref={splashScreenRef} id="splash-logo">
          <Logo3D text="AIREN-AI" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div id="sidebar-overlay" className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)}></div>
        <div ref={sidebarRef} className="absolute left-0 top-0 h-full w-80 bg-[var(--bg-secondary)] shadow-2xl transform transition-transform duration-300 ease-in-out">
          <div className="p-4 border-b border-[var(--border-color)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Logo3D text="AIREN" id="sidebar-logo" />
                <h1 className="text-xl font-semibold" style={{ color: 'var(--accent-primary)' }}> -AI</h1>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-[var(--bg-input)] transition-colors"
              >
                <i className="fas fa-times text-[var(--text-secondary)]"></i>
              </button>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <button 
              onClick={() => { setIsCodingCanvasOpen(true); setIsSidebarOpen(false); }}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[var(--bg-input)] transition-colors"
            >
              <i className="fas fa-code text-[var(--accent-primary)]"></i>
              <span className="text-[var(--text-primary)]">Coding Canvas</span>
            </button>
            <button 
              onClick={() => { handleSummarize(); setIsSidebarOpen(false); }}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[var(--bg-input)] transition-colors"
            >
              <i className="fa-solid fa-wand-sparkles text-[var(--accent-primary)]"></i>
              <span className="text-[var(--text-primary)]">Ringkas Percakapan</span>
            </button>
            <div className="border-t border-[var(--border-color)] pt-4">
              <ExportChat 
                chatHistory={chatHistory}
                disabled={chatHistory.length === 0}
              />
              <ClearChat 
                onClear={clearChatHistory}
                disabled={chatHistory.length === 0}
              />
            </div>
            <div className="border-t border-[var(--border-color)] pt-4">
              <button 
                onClick={() => { setIsSettingsOpen(true); setIsSidebarOpen(false); }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[var(--bg-input)] transition-colors"
              >
                <i className="fas fa-cog text-[var(--accent-primary)]"></i>
                <span className="text-[var(--text-primary)]">Pengaturan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <header 
        ref={appHeaderRef}
        className="p-3 sm:p-4 shadow-xl transition-colors duration-500 opacity-100 translate-y-0 bg-[var(--bg-secondary)]"
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-input)] transition-colors"
            >
              <i className="fas fa-bars text-[var(--text-secondary)]"></i>
            </button>
            <Logo3D text="AIREN" id="header-logo" />
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold" style={{ color: 'var(--accent-primary)' }}> -AI</h1>
          </div>
          {/* Icon kanan header khusus mobile */}
          <div className="flex items-center space-x-1 lg:hidden">
            <button 
              onClick={() => setIsDeveloperInfoOpen(true)}
              title="Info Developer" 
              className="header-button p-2.5 rounded-full focus:outline-none"
            >
              <i className="fas fa-user-circle"></i>
            </button>
            <ThemeToggle onThemeChange={handleThemeChange} />
          </div>
          {/* Desktop kanan header */}
          <div className="hidden lg:flex items-center space-x-1 md:space-x-2">
            <button 
              onClick={() => setIsDeveloperInfoOpen(true)}
              title="Info Developer" 
              className="header-button p-2.5 rounded-full focus:outline-none"
            >
              <i className="fas fa-user-circle"></i>
            </button>
            <button 
              onClick={() => setIsCodingCanvasOpen(true)}
              title="Coding Canvas" 
              className="header-button p-2.5 rounded-full focus:outline-none"
            >
              <i className="fas fa-code"></i>
            </button>
            <button 
              onClick={handleSummarize}
              title="Ringkas Percakapan" 
              className="header-button p-2.5 rounded-full focus:outline-none"
            >
              <i className="fa-solid fa-wand-sparkles"></i>
            </button>
            <ExportChat 
              chatHistory={chatHistory}
              disabled={chatHistory.length === 0}
            />
            <ClearChat 
              onClear={clearChatHistory}
              disabled={chatHistory.length === 0}
            />
            <button 
              onClick={() => setIsSettingsOpen(true)}
              title="Pengaturan" 
              className="header-button p-2.5 rounded-full focus:outline-none"
            >
              <i className="fas fa-cog"></i>
            </button>
            <ThemeToggle onThemeChange={handleThemeChange} />
          </div>
        </div>
      </header>

      <main 
        ref={appMainRef}
        className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 space-y-4 opacity-100 translate-y-0"
      >
        {messages.length === 0 && isInitialized && (
          <div className="flex items-center justify-center h-full px-4">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-4" style={{ color: 'var(--accent-primary)' }}>
                <i className="fas fa-robot"></i>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Selamat Datang di AIREN-AI
              </h2>
              <p className="text-base sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
                Mulai percakapan dengan mengetik pesan di bawah
              </p>
            </div>
          </div>
        )}
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.message}
            sender={msg.sender}
            imageUrl={msg.imageUrl}
            isLoading={msg.isLoading}
            isActionBubble={msg.isActionBubble}
            actionButtonId={msg.actionButtonId}
            actionButtonText={msg.actionButtonText}
            actionData={msg.actionData}
            isCodeBubble={msg.isCodeBubble}
            codeContent={msg.codeContent}
            codeLang={msg.codeLang}
            onImageClick={openFullscreenImage}
            onActionClick={handleImagineImage}
          />
        ))}
      </main>

      <footer 
        ref={appFooterRef}
        className="p-2 sm:p-3 md:p-4 shadow-t-xl transition-colors duration-500 opacity-100 translate-y-0 bg-[var(--bg-secondary)]"
      >
        <div className="container mx-auto">
          {showImagePreview && (
            <div className="image-preview-container relative">
              <img 
                src={imagePreview} 
                alt="Pratinjau Gambar" 
                className="max-h-32 rounded-lg shadow-md mx-auto mb-2 border-2 border-dashed border-[var(--accent-primary)]"
              />
              <button 
                onClick={removeImage}
                className="absolute top-1 right-1 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center text-lg leading-none focus:outline-none transition-transform duration-200 bg-red-500 hover:bg-red-600 hover:scale-110"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 p-2 border-2 border-[var(--accent-primary)] rounded-2xl bg-[var(--bg-input)] shadow-lg">
            <label 
              htmlFor="image-upload-input"
              className="rounded-lg cursor-pointer transition-all duration-200 p-3 text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] hover:bg-[rgba(var(--accent-primary-rgb),0.15)] hover:scale-110"
            >
              <i className="fas fa-image"></i>
            </label>
            <input 
              type="file" 
              id="image-upload-input" 
              accept="image/*" 
              className="hidden"
              onChange={handleImageUpload}
            />
            <input 
              ref={chatInputRef}
              type="text" 
              placeholder="Tanya AIREN-AI apa saja..." 
              className="flex-1 py-3 px-2 bg-transparent focus:outline-none text-sm md:text-base font-roboto-mono text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
              onKeyPress={handleKeyPress}
            />
            <VoiceInput 
              onTranscript={handleVoiceInput}
              disabled={chatInputRef.current?.disabled || false}
            />
            <button 
              onClick={handleSendMessage}
              className="focus:outline-none transition-all duration-200 transform active:scale-90 bg-[var(--accent-primary)] text-[var(--bubble-user-text)] p-3 rounded-xl hover:bg-[var(--accent-primary-hover)] hover:scale-105"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title={infoModalTitle}
      >
        <div dangerouslySetInnerHTML={{ __html: infoModalMessage.replace(/\n/g, '<br>') }} />
      </Modal>

      <Modal
        isOpen={isImageFullscreenOpen}
        onClose={() => setIsImageFullscreenOpen(false)}
        title=""
        className="bg-black bg-opacity-80"
      >
        <div className="relative">
          <img 
            src={fullscreenImageSrc} 
            alt="Gambar Penuh" 
            className="max-w-full max-h-full rounded-lg shadow-2xl"
          />
          <button 
            onClick={() => setIsImageFullscreenOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-sky-300"
          >
            <i className="fas fa-times fa-lg"></i>
          </button>
        </div>
      </Modal>

      <CodingCanvas 
        isOpen={isCodingCanvasOpen}
        onClose={() => setIsCodingCanvasOpen(false)}
      />

      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme || 'light'}
        onThemeChange={() => {}}
      />

      <Modal
        isOpen={isDeveloperInfoOpen}
        onClose={() => setIsDeveloperInfoOpen(false)}
        title=""
        className="w-11/12 max-w-lg flex items-center justify-center"
      >
        <div className="text-center">
          <img 
            src="https://placehold.co/100x100/0ea5e9/white?text=R&font=orbitron" 
            alt="Developer Avatar" 
            className="w-24 h-24 rounded-full mx-auto mb-4 border-3 border-[var(--accent-primary)] object-cover"
          />
          <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--accent-primary)' }}>
            Rendy Irawan
          </h3>
          <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
            Fullstack Developer & AI Enthusiast
          </p>
          <a 
            href="mailto:irawanrendy55@gmail.com" 
            className="block text-sm mb-4 hover:underline" 
            style={{ color: 'var(--accent-primary)' }}
          >
            irawanrendy55@gmail.com
          </a>
          
          <div className="mb-6">
            <a 
              href="https://www.instagram.com/rendyy_404?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Instagram"
              className="inline-block mx-3 transition-all duration-200 hover:scale-120"
              style={{ color: 'var(--text-secondary)' }}
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a 
              href="https://wa.me/6285885497377" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="WhatsApp"
              className="inline-block mx-3 transition-all duration-200 hover:scale-120"
              style={{ color: 'var(--text-secondary)' }}
            >
              <i className="fab fa-whatsapp text-2xl"></i>
            </a>
            <a 
              href="https://github.com/rendydev404" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Github"
              className="inline-block mx-3 transition-all duration-200 hover:scale-120"
              style={{ color: 'var(--text-secondary)' }}
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
          </div>
        </div>
      </Modal>

      <PWAInstall />
      <OfflineIndicator />
      {showWelcome && <WelcomeMessage onComplete={handleWelcomeComplete} />}
      {/* Theme transition overlay */}
      <div ref={themeTransitionRef} style={{
        position: 'fixed',
        zIndex: 99999,
        left: 0,
        top: 0,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        pointerEvents: 'none',
        background: theme === 'dark' ? '#0a0a1f' : '#f1f5f9',
        opacity: 0,
        display: 'none',
        transform: 'translate(-50%, -50%) scale(0)',
      }} />
    </div>
  )
} 