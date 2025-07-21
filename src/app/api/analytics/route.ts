import { NextRequest, NextResponse } from 'next/server'
import { AnalyticsEvent } from '@/lib/analytics'

export async function POST(request: NextRequest) {
  try {
    const event: AnalyticsEvent = await request.json()
    
    // Log analytics event
    console.log('Analytics Event:', {
      timestamp: new Date().toISOString(),
      ...event,
    })

    // Here you can send to your analytics service
    // For example: Google Analytics, Mixpanel, etc.
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process analytics event' },
      { status: 500 }
    )
  }
} 