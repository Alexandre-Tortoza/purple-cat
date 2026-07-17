'use client'

import { useState, useCallback, createContext, useContext, type ReactNode } from 'react'
import type { Track } from '@/entities'

type PlayTrackState = {
  currentTrack: Track | null
  isPlaying: boolean
  play: (track: Track) => void
  pause: () => void
  toggle: () => void
}

const PlayTrackContext = createContext<PlayTrackState | null>(null)

export function PlayTrackProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const play = useCallback((track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }, [])

  const pause = useCallback(() => setIsPlaying(false), [])

  const toggle = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  return (
    <PlayTrackContext.Provider value={{ currentTrack, isPlaying, play, pause, toggle }}>
      {children}
    </PlayTrackContext.Provider>
  )
}

export function usePlayTrack() {
  const ctx = useContext(PlayTrackContext)
  if (!ctx) throw new Error('usePlayTrack must be used within PlayTrackProvider')
  return ctx
}
