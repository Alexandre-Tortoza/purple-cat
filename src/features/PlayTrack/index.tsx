'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Track } from '@/entities'
import { TRACKS } from '@/shared/config/site'

// ── Tipos mínimos da YouTube IFrame API ───────────────────────────────────────
interface YTPlayer {
  loadVideoById(videoId: string): void
  playVideo(): void
  pauseVideo(): void
  getDuration(): number
  setVolume(volume: number): void
  getVideoData(): { video_id: string; title: string; author: string }
  destroy(): void
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        options: {
          videoId?: string
          playerVars?: Record<string, number | string>
          events?: {
            onReady?: (e: { target: YTPlayer }) => void
            onStateChange?: (e: { data: number }) => void
          }
        }
      ) => YTPlayer
      PlayerState: { UNSTARTED: -1; ENDED: 0; PLAYING: 1; PAUSED: 2; BUFFERING: 3; CUED: 5 }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}
// ─────────────────────────────────────────────────────────────────────────────

type PlayTrackState = {
  currentTrack: Track | null
  isPlaying: boolean
  play: (track: Track) => void
  pause: () => void
  toggle: () => void
  next: () => void
  prev: () => void
}

const PlayTrackContext = createContext<PlayTrackState | null>(null)

function randomTrack(exclude?: Track | null): Track {
  const pool = exclude ? TRACKS.filter((t) => t.id !== exclude.id) : [...TRACKS]
  return pool[Math.floor(Math.random() * pool.length)]
}

export function PlayTrackProvider({ children }: { children: ReactNode }) {
  // null on SSR — client sets the random initial track in the init effect below
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const playerRef = useRef<YTPlayer | null>(null)
  const currentTrackRef = useRef<Track | null>(null)
  const historyRef = useRef<Track[]>([])
  const shouldFadeInRef = useRef(false)
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isPlayingRef = useRef(false)

  useEffect(() => { currentTrackRef.current = currentTrack }, [currentTrack])
  useEffect(() => { isPlayingRef.current = isPlaying }, [isPlaying])

  // ── Fade de volume ──────────────────────────────────────────────────────────
  function clearFade() {
    if (fadeTimerRef.current) { clearInterval(fadeTimerRef.current); fadeTimerRef.current = null }
  }

  function fadeOut(durationMs: number): Promise<void> {
    return new Promise((resolve) => {
      const player = playerRef.current
      if (!player) { resolve(); return }
      clearFade()
      const STEPS = 8
      const stepMs = Math.max(16, durationMs / STEPS)
      let step = 0
      fadeTimerRef.current = setInterval(() => {
        step++
        player.setVolume(Math.round(100 * Math.max(0, 1 - step / STEPS)))
        if (step >= STEPS) { clearFade(); player.setVolume(0); resolve() }
      }, stepMs)
    })
  }

  function fadeIn(durationMs: number) {
    const player = playerRef.current
    if (!player) return
    clearFade()
    const STEPS = 8
    const stepMs = Math.max(16, durationMs / STEPS)
    let step = 0
    player.setVolume(0)
    fadeTimerRef.current = setInterval(() => {
      step++
      player.setVolume(Math.round(100 * Math.min(1, step / STEPS)))
      if (step >= STEPS) { clearFade(); player.setVolume(100) }
    }, stepMs)
  }
  // ─────────────────────────────────────────────────────────────────────────────

  // Lê título real e duração do player e atualiza a track em state
  function syncTrackMeta() {
    const player = playerRef.current
    if (!player) return
    const data = player.getVideoData()
    const dur = Math.round(player.getDuration())
    setCurrentTrack((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        ...(data?.title ? { title: data.title, artist: data.author } : {}),
        ...(dur > 0 ? { duration: dur } : {}),
      }
    })
  }

  useEffect(() => {
    // Pick the initial track synchronously so the ref is populated before initPlayer runs.
    // We also queue the state update so the UI reflects the chosen track after hydration.
    const initialTrack = randomTrack()
    currentTrackRef.current = initialTrack
    setCurrentTrack(initialTrack)

    function initPlayer() {
      if (!document.getElementById('yt-player-el')) return

      playerRef.current = new window.YT.Player('yt-player-el', {
        videoId: currentTrackRef.current?.src ?? '',
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            syncTrackMeta()
            shouldFadeInRef.current = true
            e.target.setVolume(0)
            e.target.playVideo()
          },
          onStateChange: (e) => {
            const { PlayerState } = window.YT
            if (e.data === PlayerState.PLAYING) {
              setIsPlaying(true)
              syncTrackMeta()
              if (shouldFadeInRef.current) {
                shouldFadeInRef.current = false
                fadeIn(350)
              }
            }
            if (e.data === PlayerState.PAUSED) setIsPlaying(false)
            if (e.data === PlayerState.ENDED) {
              setIsPlaying(false)
              if (currentTrackRef.current) {
                historyRef.current = [currentTrackRef.current, ...historyRef.current].slice(0, 20)
              }
              const nextTrack = randomTrack(currentTrackRef.current)
              setCurrentTrack(nextTrack)
              shouldFadeInRef.current = true
              playerRef.current?.setVolume(0)
              playerRef.current?.loadVideoById(nextTrack.src)
            }
          },
        },
      })
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      if (!document.getElementById('yt-api-script')) {
        const script = document.createElement('script')
        script.id = 'yt-api-script'
        script.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(script)
      }
      window.onYouTubeIframeAPIReady = initPlayer
    }

    return () => {
      clearFade()
      playerRef.current?.destroy()
      playerRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const play = useCallback((track: Track) => {
    if (currentTrackRef.current) {
      historyRef.current = [currentTrackRef.current, ...historyRef.current].slice(0, 20)
    }
    setCurrentTrack(track)
    shouldFadeInRef.current = true
    playerRef.current?.setVolume(0)
    playerRef.current?.loadVideoById(track.src)
  }, [])

  const pause = useCallback(() => {
    fadeOut(300).then(() => playerRef.current?.pauseVideo())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggle = useCallback(() => {
    if (!playerRef.current) return
    if (isPlayingRef.current) {
      fadeOut(300).then(() => playerRef.current?.pauseVideo())
    } else {
      shouldFadeInRef.current = true
      playerRef.current.setVolume(0)
      playerRef.current.playVideo()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const next = useCallback(() => {
    if (currentTrackRef.current) {
      historyRef.current = [currentTrackRef.current, ...historyRef.current].slice(0, 20)
    }
    fadeOut(200).then(() => {
      const nextTrack = randomTrack(currentTrackRef.current)
      setCurrentTrack(nextTrack)
      shouldFadeInRef.current = true
      playerRef.current?.setVolume(0)
      playerRef.current?.loadVideoById(nextTrack.src)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const prev = useCallback(() => {
    const [lastTrack, ...rest] = historyRef.current
    fadeOut(200).then(() => {
      const target = lastTrack ?? randomTrack(currentTrackRef.current)
      if (lastTrack) historyRef.current = rest
      setCurrentTrack(target)
      shouldFadeInRef.current = true
      playerRef.current?.setVolume(0)
      playerRef.current?.loadVideoById(target.src)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PlayTrackContext.Provider value={{ currentTrack, isPlaying, play, pause, toggle, next, prev }}>
      {children}
      <div
        id="yt-player-el"
        style={{ position: 'fixed', left: -9999, bottom: 0, width: 1, height: 1, pointerEvents: 'none' }}
        aria-hidden="true"
      />
    </PlayTrackContext.Provider>
  )
}

export function usePlayTrack() {
  const ctx = useContext(PlayTrackContext)
  if (!ctx) throw new Error('usePlayTrack must be used within PlayTrackProvider')
  return ctx
}
