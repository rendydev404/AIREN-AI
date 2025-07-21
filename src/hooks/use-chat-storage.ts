import { useEffect } from 'react'
import { ChatMessage } from '@/types'

export function useChatStorage(chatHistory: ChatMessage[], setChatHistory: (history: ChatMessage[]) => void) {
  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('airen-ai-chat-history')
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory)
        if (Array.isArray(parsed)) {
          setChatHistory(parsed)
        }
      } catch (error) {
        console.error('Error loading chat history:', error)
      }
    }
  }, [setChatHistory])

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('airen-ai-chat-history', JSON.stringify(chatHistory))
    }
  }, [chatHistory])

  const clearChatHistory = () => {
    localStorage.removeItem('airen-ai-chat-history')
    setChatHistory([])
  }

  return { clearChatHistory }
} 