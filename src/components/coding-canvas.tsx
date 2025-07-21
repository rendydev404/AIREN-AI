"use client"

import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { CodingCanvasProps } from '@/types'

export function CodingCanvas({ isOpen, onClose }: CodingCanvasProps) {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('html')
  const [isCopied, setIsCopied] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    try {
      if (isOpen) {
        gsap.set(modalRef.current, { opacity: 0, visibility: 'hidden' })
        gsap.timeline()
          .to(modalRef.current, { opacity: 1, visibility: 'visible', duration: 0.3, ease: 'power2.out' })
          .fromTo(contentRef.current, 
            { scale: 0.85, opacity: 0, y: -30 }, 
            { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }, 
            "-=0.15"
          )
      } else {
        gsap.timeline({
          onComplete: () => {
            if (modalRef.current) {
              modalRef.current.style.visibility = 'hidden'
            }
          }
        })
        .to(contentRef.current, { scale: 0.85, opacity: 0, y: 30, duration: 0.3, ease: 'power2.in' })
        .to(modalRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, "-=0.2")
      }
    } catch (error) {
      console.warn('GSAP error in coding canvas:', error)
      // Fallback: simple show/hide
      if (modalRef.current) {
        modalRef.current.style.visibility = isOpen ? 'visible' : 'hidden'
        modalRef.current.style.opacity = isOpen ? '1' : '0'
      }
    }
  }, [isOpen])

  const runCode = () => {
    if (!iframeRef.current) {
      alert('Preview frame tidak tersedia.')
      return
    }

    let docContent = ''

    if (language === 'html') {
      docContent = code
    } else if (language === 'css') {
      docContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>CSS Preview</title>
          <style>
            body { 
              margin: 15px; 
              padding: 0; 
              font-family: sans-serif; 
              line-height: 1.6; 
              background-color: #fff; 
              color: #333; 
            } 
            .dark-theme-preview body { 
              background-color: #1e293b; 
              color: #e2e8f0; 
            } 
            ${code} 
          </style>
        </head>
        <body class="${document.documentElement.classList.contains('dark') ? 'dark-theme-preview' : ''}">
          <h1>CSS Preview</h1>
          <p>Your styles are applied.</p>
          <div style="border:1px dashed #aaa;padding:10px;margin-top:15px;">
            <p>Sample div.</p>
            <button>Button</button>
          </div>
        </body>
        </html>`
    } else if (language === 'javascript') {
      docContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>JS Preview</title>
          <style>
            body{
              margin:15px;
              font-family:sans-serif;
              background-color:#fff;
              color:#333;
            }
            .dark-theme-preview body{
              background-color:#1e293b;
              color:#e2e8f0;
            }
            #js-output{
              margin-top:15px;
              padding:10px;
              border:1px solid #ddd;
              border-radius:5px;
              background-color:#f9f9f9;
              min-height:50px;
              font-family:'Roboto Mono',monospace;
              font-size:0.9em;
              white-space:pre-wrap;
            }
            .dark-theme-preview #js-output{
              background-color:#0f172a;
              border-color:#334155;
            }
          </style>
        </head>
        <body class="${document.documentElement.classList.contains('dark') ? 'dark-theme-preview' : ''}">
          <h1>JS Preview</h1>
          <p>Outputs & errors below and in browser console.</p>
          <div id="js-output"></div>
          <script>
            (function(){
              const o=document.getElementById('js-output');
              const c={
                log:console.log,
                error:console.error,
                warn:console.warn,
                info:console.info,
                clear:console.clear
              };
              function add(m,t='log'){
                if(!o)return;
                const p=document.createElement('p');
                p.textContent=m;
                if(t==='error')p.style.color='#d9534f';
                if(t==='warn')p.style.color='#f0ad4e';
                o.appendChild(p);
                o.scrollTop=o.scrollHeight;
              }
              console.log=(...a)=>{
                c.log.apply(console,a);
                add(a.map(String).join(' '));
              };
              console.error=(...a)=>{
                c.error.apply(console,a);
                add('ERROR: '+a.map(String).join(' '),'error');
              };
              console.warn=(...a)=>{
                c.warn.apply(console,a);
                add('WARN: '+a.map(String).join(' '),'warn');
              };
              console.info=(...a)=>{
                c.info.apply(console,a);
                add('INFO: '+a.map(String).join(' '));
              };
              console.clear=()=>{
                c.clear.apply(console);
                if(o)o.innerHTML='';
              };
              try{
                ${code}
              }catch(e){
                console.error(e.message);
              }
            })();
          </script>
        </body>
        </html>`
    }

    if (iframeRef.current) {
      iframeRef.current.srcdoc = docContent
    }
  }

  const copyCode = () => {
    if (!code) {
      alert('Tidak ada kode untuk disalin.')
      return
    }
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }).catch(err => console.error('Failed to copy code: ', err))
  }

  if (!isOpen) return null

  return (
    <div 
      ref={modalRef}
      className="modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div ref={contentRef} className="modal-content w-11/12 max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-3 md:p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <h3 className="text-lg md:text-xl font-semibold" style={{ color: 'var(--accent-primary)' }}>
            <i className="fas fa-laptop-code inline-block mr-2 -mt-1"></i>
            Tempat Ngoding 
          </h3>
          <button 
            onClick={onClose}
            className="coding-canvas-header-button rounded-full hover:bg-[rgba(var(--accent-primary-rgb),0.1)] focus:outline-none"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="flex-1 p-3 md:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 overflow-hidden code-panel-container">
          <div className="flex flex-col h-full overflow-hidden code-editor-panel md:pr-2">
            <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="p-2 text-sm bg-[var(--bg-input)] text-[var(--text-primary)] border border-[var(--border-color)] rounded"
              >
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
              </select>
              <div className="flex space-x-2">
                <button 
                  onClick={runCode}
                  className="ai-action-button text-xs sm:text-sm py-1.5 px-2.5 sm:py-2 sm:px-3"
                >
                  <i className="fas fa-play"></i> Run
                </button>
                <button 
                  onClick={copyCode}
                  className="ai-action-button text-xs sm:text-sm py-1.5 px-2.5 sm:py-2 sm:px-3"
                >
                  <i className={`fas ${isCopied ? 'fa-check' : 'fa-copy'}`}></i> 
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 text-sm resize-none flex-1 bg-[var(--bg-input)] text-[var(--text-primary)] border border-[var(--border-color)] rounded font-roboto-mono"
              placeholder="Tulis kodemu di sini..."
            />
          </div>
          
          <div className="flex flex-col h-full overflow-hidden code-preview-panel md:pl-2">
            <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Preview:</p>
            <iframe 
              ref={iframeRef}
              className="w-full flex-1 border border-[var(--border-color)] rounded bg-white dark:bg-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 