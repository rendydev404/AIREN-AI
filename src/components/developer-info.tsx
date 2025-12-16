"use client"

import { Modal } from './modal'

interface DeveloperInfoProps {
    isOpen: boolean
    onClose: () => void
}

export function DeveloperInfo({ isOpen, onClose }: DeveloperInfoProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="DEV PROFILE">
            <div className="text-center flex flex-col items-center">
                {/* Pixel Avatar Frame */}
                <div className="relative inline-block mb-6 mt-2 group">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 relative bg-[var(--panel-bg)] border-2 sm:border-4 border-[var(--border-color)] shadow-[6px_6px_0px_var(--accent-primary)] group-hover:shadow-[8px_8px_0px_var(--accent-secondary)] transition-all duration-300">
                        {/* Use same image but force square/pixel look */}
                        <img
                            src="/pp1.jpg"
                            alt="Developer Avatar"
                            className="w-full h-full object-cover rounded-none image-pixelated"
                        />
                    </div>
                    {/* Retro Online Tag */}
                    <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 px-2 py-1 text-[10px] sm:text-xs font-bold bg-[#00ff00] text-black border-2 border-black font-['Press_Start_2P'] shadow-sm animate-pulse">
                        ONLINE
                    </div>
                </div>

                {/* Name */}
                <h3 className="text-lg sm:text-xl font-bold mb-2 uppercase font-['Press_Start_2P'] text-[var(--accent-primary)] drop-shadow-[2px_2px_0px_var(--border-color)] leading-normal">
                    Rendy Irawan
                </h3>

                {/* Title */}
                <div className="inline-block px-3 py-1 mb-4 text-xs sm:text-sm font-bold border-2 border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-secondary)]">
                    FULLSTACK DEV & AI ENTHUSIAST
                </div>

                {/* Email */}
                <div className="mb-6 w-full max-w-xs break-all">
                    <a
                        href="mailto:irawanrendy55@gmail.com"
                        className="block text-base sm:text-lg hover:underline decoration-2 decoration-[var(--accent-primary)] text-[var(--text-primary)] transition-colors"
                    >
                        irawanrendy55@gmail.com
                    </a>
                </div>


                {/* Social Links (Retro Buttons) */}
                <div className="flex justify-center gap-3 sm:gap-4 mb-6 flex-wrap">
                    <a
                        href="https://www.instagram.com/rendyy_404"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-btn !p-3 sm:!p-4"
                        title="Instagram"
                    >
                        <i className="fab fa-instagram text-lg sm:text-xl"></i>
                    </a>
                    <a
                        href="https://wa.me/6285885497377"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-btn !p-3 sm:!p-4"
                        title="WhatsApp"
                    >
                        <i className="fab fa-whatsapp text-lg sm:text-xl"></i>
                    </a>
                    <a
                        href="https://github.com/rendydev404"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-btn !p-3 sm:!p-4"
                        title="Github"
                    >
                        <i className="fab fa-github text-lg sm:text-xl"></i>
                    </a>
                </div>

                {/* Bio */}
                <div className="w-full p-3 sm:p-4 text-sm sm:text-base border-2 border-[var(--border-color)] bg-[var(--bg-color)] font-['VT323'] text-left">
                    <p className="mb-2 text-[var(--text-secondary)]">// SYSTEM_MESSAGE:</p>
                    <p>&gt; "Building the future with code and AI, one project at a time."</p>
                    <p className="mt-1 animate-pulse text-[var(--accent-primary)]">_</p>
                </div>
            </div>
        </Modal>
    )
}
