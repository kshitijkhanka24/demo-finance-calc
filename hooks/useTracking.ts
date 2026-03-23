'use client'

import { useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export function useTracking(calculatorId: string) {
  const hasTracked = useRef(false)

  useEffect(() => {
    // Only track once per mount to avoid duplicate analytics in development strict mode
    if (hasTracked.current) return
    hasTracked.current = true

    async function trackUsage() {
      try {
        await supabase
          .from('calculator_usage')
          .insert([
            { calculator_id: calculatorId, timestamp: new Date().toISOString() }
          ])
      } catch (error) {
        console.error('Failed to log calculator usage:', error)
      }
    }

    trackUsage()
  }, [calculatorId])
}
