'use client'

import { motion } from 'motion/react'
import { usePlayTrack } from '@/features/PlayTrack'
import { useAppAnimation } from '@/features/AppAnimation'
import { PlayIcon, PauseIcon, SkipPrevIcon, SkipNextIcon } from '@/shared/ui/icons'

export function PlayBar() {
  const { currentTrack, isPlaying, toggle } = usePlayTrack()
  const { phase } = useAppAnimation()

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={phase === 'ready' ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-purple-900/30 bg-[#090710]/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-950 text-purple-400">
            <span className="text-xs font-bold">PC</span>
          </div>
          {currentTrack ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-100">
                {currentTrack.title}
              </p>
              <p className="truncate text-xs text-zinc-500">{currentTrack.artist}</p>
            </div>
          ) : (
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-400">
                No track selected
              </p>
              <p className="text-xs text-zinc-500">
                Browse and play a song
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            className="hidden text-zinc-500 transition-colors hover:text-zinc-300 sm:block"
            aria-label="Previous track"
          >
            <SkipPrevIcon />
          </button>

          <button
            onClick={toggle}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white transition-colors hover:bg-purple-700"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button
            className="hidden text-zinc-500 transition-colors hover:text-zinc-300 sm:block"
            aria-label="Next track"
          >
            <SkipNextIcon />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
