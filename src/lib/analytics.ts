export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}

class Analytics {
  private isEnabled = process.env.NODE_ENV === 'production'

  trackEvent(event: AnalyticsEvent) {
    if (!this.isEnabled) {
      console.log('Analytics Event:', event)
      return
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      })
    }

    // Custom analytics endpoint
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }).catch(console.error)
  }

  trackPageView(page: string) {
    this.trackEvent({
      action: 'page_view',
      category: 'engagement',
      label: page,
    })
  }

  trackMessageSent(messageType: 'text' | 'image' | 'voice') {
    this.trackEvent({
      action: 'message_sent',
      category: 'engagement',
      label: messageType,
    })
  }

  trackFeatureUsed(feature: string) {
    this.trackEvent({
      action: 'feature_used',
      category: 'engagement',
      label: feature,
    })
  }

  trackError(error: string) {
    this.trackEvent({
      action: 'error',
      category: 'error',
      label: error,
    })
  }
}

export const analytics = new Analytics() 