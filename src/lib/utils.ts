import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function escapeHtml(unsafe: string): string {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function detectCodeAndLanguage(text: string) {
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)\n```/;
  const match = text.match(codeBlockRegex);
  if (match) {
    return { isCode: true, language: match[1] || 'code', content: match[2].trim() };
  }
  const commonCodeKeywords = ['function', 'class', 'const', 'let', 'var', '<div>', '<html>', 'public class', 'def ', 'SELECT ', 'FROM ', 'UPDATE ', 'INSERT INTO'];
  const lineBreakCount = (text.match(/\n/g) || []).length;
  if (commonCodeKeywords.some(kw => text.includes(kw)) && text.length > 30 && (lineBreakCount > 1 || text.includes('{') || text.includes(';') || text.includes('<'))) {
    if (text.includes('<html>') || text.includes('<!DOCTYPE html>')) return { isCode: true, language: 'html', content: text.trim() };
    if (text.includes('function') || text.includes('=>') || text.includes('console.log')) return { isCode: true, language: 'javascript', content: text.trim() };
    if (text.match(/\.[a-zA-Z0-9_-]+\s*\{/)) return { isCode: true, language: 'css', content: text.trim() };
    if (text.toLowerCase().includes('select ') && text.toLowerCase().includes('from ')) return { isCode: true, language: 'sql', content: text.trim() };
    return { isCode: true, language: 'code', content: text.trim() }; 
  }
  return { isCode: false };
} 