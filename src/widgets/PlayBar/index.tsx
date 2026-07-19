'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import type { Track } from '@/entities'
import { usePlayTrack } from '@/features/PlayTrack'
import { useAppAnimation } from '@/features/AppAnimation'
import { PauseIcon, PlayIcon } from '@/shared/ui/icons'
import { Container } from '@/shared/ui/Container'
import { TRANSITION_SLIDE_IN } from '@/shared/lib/animations'

function formatTime(seconds: number) {
  const total = Math.max(0, Math.floor(seconds))
  const minutes = Math.floor(total / 60)
  const remainder = total % 60

  return `${minutes}:${remainder.toString().padStart(2, '0')}`
}

type PlaybackControlProps = {
  track: Track | null
  isPlaying: boolean
  pause: () => void
  toggle: () => void
}

function PlaybackControl({ track, isPlaying, pause, toggle }: PlaybackControlProps) {
  const [elapsed, setElapsed] = useState(0)
  const duration = track?.duration ?? 0

  useEffect(() => {
    if (!isPlaying || !track || duration === 0) return

    const interval = window.setInterval(() => {
      setElapsed((current) => {
        const next = current + 1

        if (next >= duration) {
          pause()
          return duration
        }

        return next
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [duration, isPlaying, pause, track])

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex h-11 shrink-0 items-center gap-3 rounded-full border px-4 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 ${
        isPlaying
          ? 'border-purple-400 bg-purple-500/10 text-purple-100'
          : 'border-white/15 bg-[#090710]/45 text-zinc-300 hover:border-white/30 hover:bg-[#090710]/70'
      }`}
      aria-label={isPlaying ? 'Pausar' : 'Tocar'}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-sm border ${
          isPlaying
            ? 'border-purple-300 bg-[linear-gradient(135deg,#a855f7,#5b21b6)] text-white'
            : 'border-white/15 bg-[linear-gradient(135deg,#3f3f46,#18181b)] text-zinc-100'
        }`}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </span>
      <span className="tabular-nums">{formatTime(elapsed)} / {formatTime(duration)}</span>
    </button>
  )
}

export function PlayBar() {
  const { currentTrack, isPlaying, pause, toggle } = usePlayTrack()
  const { phase } = useAppAnimation()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20)
  })

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={phase === 'ready' ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
      transition={TRANSITION_SLIDE_IN}
      style={{
        height: isScrolled ? '64px' : '80px',
        backgroundColor: isScrolled ? 'rgba(9, 7, 16, 0.8)' : 'rgba(9, 7, 16, 0)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        borderTop: isScrolled
          ? '1px solid rgba(124, 45, 173, 0.2)'
          : '1px solid rgba(124, 45, 173, 0)',
      }}
      className="fixed bottom-0 left-0 right-0 z-40 transition-all duration-700 ease-out"
    >
      <Container className="flex h-full items-center justify-between gap-4">
        <PlaybackControl
          key={currentTrack?.id ?? 'empty'}
          track={currentTrack}
          isPlaying={isPlaying}
          pause={pause}
          toggle={toggle}
        />

        <div className="min-w-0 text-right">
          <p className="truncate text-sm font-medium text-zinc-100">{currentTrack?.artist ?? 'Purple Cat'}</p>
          <p className="mt-0.5 truncate text-xs text-zinc-500">{currentTrack?.title ?? 'Selecione uma faixa para começar'}</p>
        </div>
      </Container>
    </motion.div>
  )
}
