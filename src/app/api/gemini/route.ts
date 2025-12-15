import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI, Part } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    const { messages, type } = await request.json()

    // Get API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY

    console.log('API Key exists:', !!apiKey)

    if (!apiKey) {
      console.error('Missing GEMINI_API_KEY environment variable')
      return NextResponse.json(
        { error: 'API key tidak ditemukan. Pastikan GEMINI_API_KEY sudah diset di .env.local' },
        { status: 500 }
      )
    }

    // Initialize Google AI SDK
    const genAI = new GoogleGenerativeAI(apiKey)

    // Use gemini-2.5-flash (model terbaru dengan vision support)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Convert messages to the format expected by the SDK
    // Handle both text and image parts
    const contents = messages.map((msg: any) => ({
      role: msg.role,
      parts: msg.parts.map((part: any): Part => {
        // Handle text parts
        if (part.text) {
          return { text: part.text }
        }
        // Handle image parts (inline data)
        if (part.inlineData) {
          return {
            inlineData: {
              mimeType: part.inlineData.mimeType,
              data: part.inlineData.data
            }
          }
        }
        // Handle file data parts
        if (part.fileData) {
          return {
            fileData: {
              mimeType: part.fileData.mimeType,
              fileUri: part.fileData.fileUri
            }
          }
        }
        // Default to empty text if unknown part type
        return { text: '' }
      })
    }))

    console.log('Sending request to Gemini API with SDK...')
    console.log('Message parts types:', messages[0]?.parts?.map((p: any) =>
      p.text ? 'text' : p.inlineData ? 'image' : 'unknown'
    ))

    // Generate content with retry logic for 503 errors
    let result
    let retries = 3

    while (retries > 0) {
      try {
        result = await model.generateContent({
          contents: contents
        })
        break // Success, exit retry loop
      } catch (error: any) {
        if (error.message?.includes('503') || error.message?.includes('overloaded')) {
          retries--
          if (retries > 0) {
            console.log(`Model overloaded, retrying... (${retries} attempts left)`)
            await new Promise(resolve => setTimeout(resolve, 2000)) // Wait 2 seconds
            continue
          }
        }
        throw error // Re-throw if not 503 or no retries left
      }
    }

    if (!result) {
      return NextResponse.json(
        { error: 'Model sedang sibuk, coba lagi dalam beberapa saat.' },
        { status: 503 }
      )
    }

    const response = result.response
    const text = response.text()

    console.log('API Response received')

    return NextResponse.json({ text })

  } catch (error: any) {
    console.error('Gemini API error:', error)

    // Handle specific error types
    if (error.message?.includes('API_KEY_INVALID')) {
      return NextResponse.json(
        { error: 'API key tidak valid. Silakan buat API key baru di https://aistudio.google.com/app/apikey' },
        { status: 401 }
      )
    }

    if (error.message?.includes('QUOTA_EXCEEDED') || error.message?.includes('429')) {
      return NextResponse.json(
        { error: 'Quota API habis. Coba lagi nanti atau gunakan API key yang berbeda.' },
        { status: 429 }
      )
    }

    if (error.message?.includes('503') || error.message?.includes('overloaded')) {
      return NextResponse.json(
        { error: 'Server AI sedang sibuk. Coba lagi dalam beberapa saat.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: `Terjadi kesalahan: ${error.message || 'Internal server error'}` },
      { status: 500 }
    )
  }
}