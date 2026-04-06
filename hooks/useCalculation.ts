'use client'

import { useCallback } from 'react'
import { supabase } from '@/lib/supabase'

/**
 * Hook for logging calculator usage to Supabase for admin analytics.
 * Sends calculator_id, user_id (if authenticated), and parameters.
 * Fires-and-forgets — errors are logged but never thrown.
 */
export function useCalculation(calculatorId: string) {
  const logCalculation = useCallback(
    async (parameters?: Record<string, unknown>) => {
      try {
        // Get current user session (null for anonymous users)
        const {
          data: { user },
        } = await supabase.auth.getUser()

        await supabase.from('calculator_usage').insert([
          {
            calculator_id: calculatorId,
            user_id: user?.id ?? null,
            timestamp: new Date().toISOString(),
            // Sanitize parameters — only keep serializable primitives
            parameters: parameters
              ? JSON.stringify(
                  Object.fromEntries(
                    Object.entries(parameters).filter(
                      ([, v]) => typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean'
                    )
                  )
                )
              : null,
          },
        ])
      } catch (error) {
        // Never let analytics failures surface to the user
        console.error('[useCalculation] Failed to log usage:', error)
      }
    },
    [calculatorId]
  )

  return { logCalculation }
}
