import { NextRequest, NextResponse } from 'next/server'
import { ChatMessage, GeminiResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { messages, type } = await request.json()
    
    // Use hardcoded values for testing
    const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyByOkC9S5xPskOe915uvlvKk0oq4tgYOTs'
    const apiUrl = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
    
    console.log('API Key exists:', !!apiKey)
    console.log('API URL exists:', !!apiUrl)
    console.log('API URL:', apiUrl)
    
    if (!apiKey || !apiUrl) {
      console.error('Missing environment variables:', { apiKey: !!apiKey, apiUrl: !!apiUrl })
      return NextResponse.json(
        { error: 'API key atau URL tidak ditemukan' },
        { status: 500 }
      )
    }

    let payload: any = {
      contents: messages
    }

    // Handle different types of requests
    if (type === 'imagine') {
      payload = {
        contents: messages
      }
    } else if (type === 'summarize') {
      payload = {
        contents: messages
      }
    }

    console.log('Sending request to Gemini API...')
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    console.log('Response status:', response.status)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        error: { message: "Respons error tidak valid." }
      }))
      console.error('API Error:', errorData)
      return NextResponse.json(
        { error: `API Error: ${response.status}. ${errorData.error?.message || 'Tidak ada detail.'}` },
        { status: response.status }
      )
    }

    const result: GeminiResponse = await response.json()
    console.log('API Response received')
    
    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      return NextResponse.json({
        text: result.candidates[0].content.parts[0].text
      })
    }

    return NextResponse.json(
      { error: 'Struktur respons tidak sesuai' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan internal server' },
      { status: 500 }
    )
  }
} 