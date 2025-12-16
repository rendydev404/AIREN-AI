"use client"

import { useState, useRef } from 'react'
import { CodingCanvasProps } from '@/types'
import { Modal } from './modal'

export function CodingCanvas({ isOpen, onClose }: CodingCanvasProps) {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('html')
  const [isCopied, setIsCopied] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="CODING CANVAS"
    >
      <div className="flex flex-col min-h-[60vh] md:min-h-[70vh] w-full overflow-hidden">

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 overflow-hidden">
          {/* EDITOR COLUMN */}
          <div className="flex flex-col h-full overflow-hidden gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2 p-1">
              <div className="pixel-input-wrapper !p-0 !border-2 w-auto bg-[var(--panel-bg)]">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="pixel-input-field !text-sm !py-1 !px-2 bg-transparent cursor-pointer uppercase font-bold text-[var(--text-primary)] focus:outline-none"
                >
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="javascript">JS</option>
                </select>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={runCode}
                  className="pixel-btn !py-2 !px-3 hover:scale-105 active:scale-95"
                  title="Run Code"
                >
                  <i className="fas fa-play text-xs sm:text-sm"></i>
                  <span className="hidden sm:inline text-xs ml-2">RUN</span>
                </button>
                <button
                  onClick={copyCode}
                  className="pixel-btn !py-2 !px-3 hover:scale-105 active:scale-95"
                  title="Copy Code"
                >
                  <i className={`fas ${isCopied ? 'fa-check' : 'fa-copy'} text-xs sm:text-sm`}></i>
                  <span className="hidden sm:inline text-xs ml-2">{isCopied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="resize-none flex-1 w-full p-3 sm:p-4 bg-[var(--bg-input)] text-[var(--text-primary)] border-2 border-[var(--border-color)] font-['Fira_Code'] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] shadow-inner custom-scrollbar"
              placeholder={`// Write your ${language.toUpperCase()} code here...`}
              spellCheck={false}
            />
          </div>

          {/* PREVIEW COLUMN */}
          <div className="flex flex-col h-full overflow-hidden border-t-4 lg:border-t-0 lg:border-l-4 border-[var(--border-color)] pt-4 lg:pt-0 lg:pl-4 min-h-[300px]">
            <div className="flex items-center justify-between mb-2">
              <span className="bg-[var(--text-secondary)] text-[var(--bg-color)] px-2 py-0.5 text-xs font-bold font-['Press_Start_2P']">PREVIEW OUTPUT</span>
            </div>
            <iframe
              ref={iframeRef}
              className="w-full flex-1 border-2 border-[var(--border-color)] bg-white shadow-[4px_4px_0px_rgba(0,0,0,0.1)]"
              title="Code Preview"
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}