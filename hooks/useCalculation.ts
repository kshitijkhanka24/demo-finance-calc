'use client'

import { useCallback } from 'react'
import { supabase } from '@/lib/supabase'

/**
 * Hook for calculator button-triggered computation + Supabase monitoring.
 * Call `logCalculation` when the Calculate button is clicked.
 */
export function useCalculation(calculatorId: string) {
  const logCalculation = useCallback(async (parameters?: Record<string, any>) => {
    try {
      await supabase
        .from('calculator_usage')
        .insert([
          {
            calculator_id: calculatorId,
            timestamp: new Date().toISOString(),
            parameters: parameters ? JSON.stringify(parameters) : null,
          }
        ])
    } catch (error) {
      console.error('Failed to log calculator usage:', error)
    }
  }, [calculatorId])

  return { logCalculation }
}
