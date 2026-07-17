'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Phase = 'intro' | 'ready'

type AppAnimationState = {
  phase: Phase
}

const AppAnimationContext = createContext<AppAnimationState>({ phase: 'intro' })

export function AppAnimationProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>('intro')

  useEffect(() => {
    const timer = setTimeout(() => setPhase('ready'), 3100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AppAnimationContext.Provider value={{ phase }}>
      {children}
    </AppAnimationContext.Provider>
  )
}

export function useAppAnimation() {
  return useContext(AppAnimationContext)
}
