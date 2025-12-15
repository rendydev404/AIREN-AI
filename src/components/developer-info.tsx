"use client"

import { Modal } from './modal'

interface DeveloperInfoProps {
    isOpen: boolean
    onClose: () => void
}

export function DeveloperInfo({ isOpen, onClose }: DeveloperInfoProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="DEV PROFILE">
            <div className="text-center">
                {/* Pixel Avatar Frame */}
                <div className="relative inline-block mb-6 mt-2">
                    <div
                        className="w-32 h-32 relative"
                        style={{
                            border: '4px solid var(--border-color)',
                            background: 'var(--panel-bg)',
                            boxShadow: '8px 8px 0px var(--accent-primary)',
                        }}
                    >
                        {/* Use same image but force square/pixel look */}
                        <img
                            src="/pp1.jpg"
                            alt="Developer Avatar"
                            className="w-full h-full object-cover"
                            style={{
                                borderRadius: 0,
                                imageRendering: 'pixelated',
                            }}
                        />
                    </div>
                    {/* Retro Online Tag */}
                    <div
                        className="absolute -bottom-3 -right-3 px-2 py-1 text-xs font-bold"
                        style={{
                            background: '#00ff00',
                            color: '#000',
                            border: '2px solid #000',
                            fontFamily: '"Press Start 2P"',
                            boxShadow: '4px 4px 0px rgba(0,0,0,0.2)'
                        }}
                    >
                        ONLINE
                    </div>
                </div>

                {/* Name */}
                <h3
                    className="text-xl font-bold mb-2 uppercase"
                    style={{
                        fontFamily: '"Press Start 2P"',
                        color: 'var(--accent-primary)',
                        textShadow: '2px 2px 0px var(--border-color)',
                        lineHeight: '1.4'
                    }}
                >
                    Rendy Irawan
                </h3>

                {/* Title */}
                <div
                    className="inline-block px-3 py-1 mb-4 text-sm font-bold border-2"
                    style={{
                        borderColor: 'var(--border-color)',
                        background: 'var(--bg-color)',
                        color: 'var(--text-secondary)'
                    }}
                >
                    FULLSTACK DEV & AI ENTHUSIAST
                </div>

                {/* Email */}
                <div className="mb-6">
                    <a
                        href="mailto:irawanrendy55@gmail.com"
                        className="block text-lg hover:underline pixel-text"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        irawanrendy55@gmail.com
                    </a>
                </div>


                {/* Social Links (Retro Buttons) */}
                <div className="flex justify-center gap-4 mb-6">
                    <a
                        href="https://www.instagram.com/rendyy_404"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-btn"
                        title="Instagram"
                    >
                        <i className="fab fa-instagram text-xl"></i>
                    </a>
                    <a
                        href="https://wa.me/6285885497377"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-btn"
                        title="WhatsApp"
                    >
                        <i className="fab fa-whatsapp text-xl"></i>
                    </a>
                    <a
                        href="https://github.com/rendydev404"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-btn"
                        title="Github"
                    >
                        <i className="fab fa-github text-xl"></i>
                    </a>
                </div>

                {/* Bio */}
                <div
                    className="p-3 text-sm border-2 border-[var(--border-color)] bg-[var(--bg-color)]"
                    style={{ fontFamily: '"VT323"' }}
                >
                    <p>&gt; "Building the future with code and AI, one project at a time."</p>
                    <p className="mt-1 animate-pulse">_</p>
                </div>
            </div>
        </Modal>
    )
}
