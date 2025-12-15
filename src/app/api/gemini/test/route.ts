import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function GET(request: NextRequest) {
    try {
        const apiKey = process.env.GEMINI_API_KEY

        if (!apiKey) {
            return NextResponse.json({
                error: 'API key tidak ditemukan',
                envCheck: {
                    GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
                    keyLength: process.env.GEMINI_API_KEY?.length || 0,
                    keyPrefix: process.env.GEMINI_API_KEY?.substring(0, 10) || 'N/A'
                }
            }, { status: 500 })
        }

        // Test dengan fetch langsung untuk list models
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        )

        if (!response.ok) {
            const errorData = await response.json()
            return NextResponse.json({
                error: 'Gagal fetch models',
                status: response.status,
                details: errorData,
                keyPrefix: apiKey.substring(0, 10)
            }, { status: response.status })
        }

        const data = await response.json()

        // Filter hanya model yang support generateContent
        const generateContentModels = data.models?.filter((m: any) =>
            m.supportedGenerationMethods?.includes('generateContent')
        ).map((m: any) => ({
            name: m.name,
            displayName: m.displayName,
            methods: m.supportedGenerationMethods
        }))

        return NextResponse.json({
            success: true,
            message: 'API key valid!',
            keyPrefix: apiKey.substring(0, 10),
            totalModels: data.models?.length || 0,
            generateContentModels: generateContentModels
        })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            stack: error.stack
        }, { status: 500 })
    }
}
