'use client'

import type { ReactNode } from 'react'
import { PlayTrackProvider } from '@/features/PlayTrack'
import { MenuProvider } from '@/features/ToggleMenu'
import { AppAnimationProvider } from '@/features/AppAnimation'
import { SmoothScrollProvider } from '@/shared/ui/SmoothScrollProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <AppAnimationProvider>
        <MenuProvider>
          <PlayTrackProvider>{children}</PlayTrackProvider>
        </MenuProvider>
      </AppAnimationProvider>
    </SmoothScrollProvider>
  )
}
